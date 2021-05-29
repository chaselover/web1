import "./styles.css";
import React, { useEffect, useState, useRef } from "react";

// 알람이 실행되는 function
// notification api 사용 mdn가면 기능많음.
// 이미지 아이콘 진동 등등 모든걸 보낼 수 있음.(MDN참고)
const useNotification = (title, options) => {
  if ("Notificantion" in window) {
    return;
  }
  const fireNotif = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
};

const App = () => {
  const triggerNotif = useNotification("Can I steal your kimchi?", {
    body: "i love kimchi dont you?",
  });
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <button onClick={triggerNotif}>Hello</button>
    </div>
  );
};

export default App;
