import { createStore } from "redux";

// export default를 통해 결과를 바깥으로 빼냄
// store두번째 인자로 redux devtools 코드 넣어줌.
export default createStore(function (state, action) {
  if (state === undefined) {
    return { number: 0 };
  }
  if (action.type === "INCREMENT") {
    // immutable 코드 state복사하고 뒤에 props만 변경
    return { ...state, number: state.number + action.size };
  }
  return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());
