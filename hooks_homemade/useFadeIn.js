import "./styles.css";
import React, { useEffect, useState, useRef } from "react";

// element를 지연시키거나 천천히 나타나게함
// css로 할수도 있는데 animation을 hook에 포함시키는 것도 의미있음.
const useFadeIn = (duration = 1, delay = 0) => {
  if (typeof duration !== "number" || typeof delay !== "number") {
    return;
  }
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      //   transition의 요소들을 건드리면 fadein 조절할수있음.
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};

const App = () => {
  const fadeInH1 = useFadeIn(1, 2);
  const fadeInP = useFadeIn(5, 10);
  return (
    <div className="App">
      <h1 {...fadeInH1}>hello</h1>
      <p {...fadeInP}>lorem ipsum alalallal</p>
    </div>
  );
};

export default App;
