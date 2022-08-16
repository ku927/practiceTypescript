import '@testing-library/react';
import { ButtonCode, calculate, State } from './calculate';
// テストを実行するには「npm test」
// 2つ目の引数は実行する内容をラムダ式で実装
/*
test("sample", () => {
  expect("A").toBe("A");
});
*/

// 初期状態を作成
function makeInitState(): State {
  return {
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false
  };
}

// ButtonCodeを配列で受け取り、calculate()を繰り返し呼びながら状態を変化させる関数
function execCalc(buttons: ButtonCode[], state: State): State {
  buttons.forEach((button) => {
    state = calculate(button, state);
  });
  return state;
}

test("add", () => {
  const finalState = execCalc(["1", "+", "2", "="], makeInitState());
  expect(finalState.current).toBe("3");
  expect(finalState.operand).toBe(0);
  expect(finalState.operator).toBe(null);
  expect(finalState.isNextClear).toBe(true);

})