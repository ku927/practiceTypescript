export type Operator = "+" | "-"
export type NumberCode = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type ButtonCode = NumberCode | Operator | "." | "D" | "AC" | "=";

export function calculate(button: ButtonCode, state: State): State {//どのボタンかを表す引数とインターフェースstate（現在の状態）
 // 数値かどうか
if (isNumberButton(button)) {
  return handleNumberButton(button, state);
}

// +か-か
if (isOperatorButton(button)) {
  return handleOperatorButton(button, state);
}

// .かどうか
if (isDotButton(button)) {
  return handleDotButton(state);
}

// 削除ボタンかどうか
if (isDeleteButton(button)) {
  return handleDeleteButton(state);
}

// ACかどうか
if (isAllClearButton(button)) {
  return handleAllClearButton();
}

// =かどうか
if (isEqualButton(button)) {
  return handleEqualButton(state);
}

  return state;
}

export interface State {
  current: string;// 表示している内容
  operand: number;// 計算に使う数値
  operator: string | null;// どの計算をするか(+か-) 未設定の場合もあるのでnull許容
  isNextClear: boolean;// 次にクリアするべきかのフラグ
}

function isNumberButton(button: string): button is NumberCode {//型ガードの構文。trueを返すと引数のbuttonはNumberCodeと伝えることができる。
  return (
    button === "0" ||
    button === "1" ||
    button === "2" ||
    button === "3" ||
    button === "4" ||
    button === "5" ||
    button === "6" ||
    button === "7" ||
    button === "8" ||
    button === "9"
  );
}
function handleNumberButton(button: NumberCode, state: State): State {

  // 消すべきかどうかの判定
  if (state.isNextClear) {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextClear: false
    };
  }

  // 今の表示が0の場合は次の状態として今表示している値は押したボタンの値
  if (state.current === "0") {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextClear: false
    };
  }

  // 表示が0以外の時
  return {
    current: state.current + button,
    operand: state.operand,
    operator: state.operator,
    isNextClear: false
  };
}

function isOperatorButton(button: string): button is Operator {
  return button === "+" || button === "-";
}

function handleOperatorButton(button: Operator, state: State): State {

  // オペレータが押された状態かどうか
  if (state.operator === null) {
    return {
      current: state.current,
      operand: parseFloat(state.current),
      operator: button,
      isNextClear: true
    };
  }

  // +か-が押されていた状態でもう一度それが押された場合
  const nextValue = operate(state)
  return {
    current: '{$nextValue}',
    operand: nextValue, //+が押された後は左側の数値にも入れておく必要があるのでoperand部分にもnextValueを入れる
    operator: button,
    isNextClear: true
  };
}

function isDotButton(button: string) {
  return button === ".";
}

function handleDotButton(state: State): State {

  // 現在入力されている値に.があるかどうか
  if (state.current.indexOf('.') !== -1) {// どこかに.がある場合
    return state;
  }

  // .を加えるべき場合
  return {
    current: state.current + ".",
    operand: state.operand,
    operator: state.operator,
    isNextClear: false
  };
}

function isDeleteButton(button: string) {
  return button === "D";
}

function handleDeleteButton(state: any): State {
  
  // １文字しかない場合は0に戻す
  if (state.current.length === 1) {
    return {
      current: "0",
      operand: state.operand,
      operator: state.operator,
      isNextClear: false
    };
  }

  return {
    current: state.current.substring(0, state.current.length - 1),// 一番最後の文字を削除
    operand: state.operand,
    operator: state.operator,
    isNextClear: false
  };
}

function isAllClearButton(button: string) {
  return button === "AC";
}

function handleAllClearButton(): State {

  // 初期状態に戻す
  return {
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false
  };
}

function isEqualButton(button: string) {
  return button === "=";
}

function handleEqualButton(state: State): State {

  if (state.operator == null) {
    return state;
  }

  const nextValue = operate(state);

  return {
    current: `${nextValue}`,
    operand: 0,
    operator: null,
    isNextClear: true
  };
}

function operate(state: State): number {

  // 表示している内容を数値に変換
  const current = parseFloat(state.current);

  if (state.operator === "+") {
    return state.operand + current;
  }
  if (state.operator === "-") {
    return state.operand - current;
  }
  return current;
}

