import "./styles.css";
import React, { useEffect, useState, useRef } from "react";

// confirm 은 사용자가 버튼 클릭하면 이벤트 실행전에 확인메세지를 보여주고 싶을때 사용.
const useConfirm = (message = "", onConfirm, onCancel) => {
  // onConfirm이 없거나 function이 아닐때. 실행x
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (onCancel && typeof onConcel !== "function") {
    return;
  }
  const confrimAction = () => {
    if (confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };
  return confrimAction;
};
const App = () => {
  const deleteWorld = () => console.log("delete in the world");
  const abort = () => console.log("Aborted");
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort);
  return (
    <div className="App">
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
};

export default App;
