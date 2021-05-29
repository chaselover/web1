import "./styles.css";
import React, { useEffect, useState, useRef } from "react";

// useClick은 mouseenter을 이용한 useHover과 같음. click자리에 mouseenter만 넣으면 됨.

//App은 useClick을 사용해 useRef()를 만들었고
// 그걸 title에 부여해줌. 그걸 h1태그 title에 넘겨줌.
// useEffect는 element안에 current가 있는지 확인해서 있으면 clickevent를 부여함.
const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }
  const element = useRef();
  useEffect(() => {
    // 여기는componentDidMount, componentDidUpdate(click이벤트마다.)
    // 하지만 dependency가 없으므로 componentDidMount떄만 호출해서 영원히 있음.
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    // return부분은 componentWillUnmount
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  return element;
};

// title을 참조해보자. =>title에 접근할 수 있다.
const App = () => {
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

export default App;
