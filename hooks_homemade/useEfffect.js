import "./styles.css";
import React, { useEffect, useState } from "react";

const App = () => {
  const sayHello = () => console.log("hello");
  // useEffect는 함수와 배열을 인자로 받음. dependency 배열안에있는게 상태가 변할때만 함수실행.
  useEffect(sayHello, []);
  const [number, setNumber] = useState(0);
  const [anumber, setANumber] = useState(0);
  return (
    <div className="App">
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setANumber(anumber + 1)}>{anumber}</button>
    </div>
  );
};

export default App;
