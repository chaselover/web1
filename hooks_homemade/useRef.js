import "./styles.css";
import React, { useEffect, useState, useRef } from "react";

// react의 모든 component는 reference props를 가지고있음
// reference는 document.elementByID같은 식별자 역할.

const App = () => {
  const potato = useRef();
  setTimeout(() => potato.current.focus(), 5000);
  return (
    <div className="App">
      <div>Hi</div>
      <input ref={potato} placeholder="la" />
    </div>
  );
};

export default App;
