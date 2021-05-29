import "./styles.css";
import React, { useEffect, useState, useRef } from "react";

// usePreventLeave는 윈도우떠날때 야! 아직 저장 안했어! 알려주는거
// 사용자 보호의일종.
const usePreventLeave = () => {
  const listner = (event) => {
    event.preventDefault();
    // returnValue 이거 안넣어주면 메세지 안뜸..
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listner);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listner);
  return { enablePrevent, disablePrevent };
};

const App = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div className="App">
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
    </div>
  );
};

export default App;
