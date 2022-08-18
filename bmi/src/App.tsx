import React, { useState } from 'react';
import './App.css';

function App() {

  // 身長と体重の2つがあるのでそれらを状態として持たせ、初期値を設定
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  // 結果を入れる状態
  const [result, setResult] = useState(0);

  // ボタン押下時にBMIを計算する
  const submit = () => {
    const bmi = weight / (height * height);
    setResult(bmi);
  }

  return (
    <div>
      <h1>BMI計算機だよ！</h1>
      <div>
        <label htmlFor="height">身長(m)</label>
        <input id="height" value={height} type="number" onChange={(event) => setHeight(event.target.valueAsNumber)/*onChangeでは、eventが渡されるのでevent.target.valueAsNumberを使って入力された値を取り出す*/}/>
      </div>
      <div>
        <label htmlFor="weight">体重(kg)</label>
        <input id="weight" value={weight} type="number" onChange={(event) => setWeight(event.target.valueAsNumber)}/>
      </div>
      {(result > 0)? <p>BMIは{result}だよ！</p>: null}
      <div>
        <button onClick={submit}>計算！</button>
      </div>
    </div>
  );
}

export default App;
