import { useState } from "react";
import { ButtonCode, calculate, State } from "../logic/calculate";
import ButtonPanel from "./ButtonPanel";
import Display from "./Display";
import "./Calculator.scss"

export default function Calculator() {

  const [state, setState] = useState<State>({
    // 初期状態を設定
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false
  })
  const buttonHandler = (code: ButtonCode) => {

    // コンポーネントの状態として持たせる必要がある
    const nextState = calculate(code, state)

    // 次の状態が決まったらその値をセットする
    setState(nextState);

  }
  return (
    <div>
      <Display value={state.current}/>
      <ButtonPanel buttonHandler={buttonHandler}/>
    </div>
  )
}