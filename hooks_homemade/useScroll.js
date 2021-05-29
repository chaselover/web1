import "./styles.css";
import React, { useEffect, useState, useRef } from "react";

// useScroll은 유저가 스크롤해서 무언가 지나쳤을때 색상이 바뀐다거나 뭔갈 할 필요있을때ㅣ..
// 스크롤은 옆에 무빙바를 나타내는것.
const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });
  const onScroll = () => {
    console.log("y", window.scrollY, "x", window.scrollX);
    setState({ y: window.scrollY, x: window.scrollX });
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return state;
};

const App = () => {
  const { y } = useScroll();
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>Hi</h1>
    </div>
  );
};

export default App;
