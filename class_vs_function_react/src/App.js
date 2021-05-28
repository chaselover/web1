import React, { useState, useEffect } from "react";
import "./App.css";

// props initNumber로 전달.
function App() {
  var [funcShow, setFuncShow] = userState(true);
  var [classShow, setClassShow] = userState(true);
  return (
    <div className="App">
      <h1>Hello worlds!</h1>
      <input
        type="button"
        value="remove func"
        onClick={function () {
          setFuncShow(false);
        }}
      ></input>
      <input
        type="button"
        value="remove comp"
        onClick={function () {
          setClassShow(false);
        }}
      ></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

// 함수방식은 자기자신이 render함수
// props를 컴포넌트의 인자(argument)로 받음 "(인자이름은 props가 아닌 다른것이어도 상관없음")
// 이전 함수형 컴포넌트의 역할은 단지 props를 view시키는 것밖에 못했음
var funcId = 0;
function FuncComp(props) {
  var numberState = useState(props.initNumber);
  var number = numberState[0];
  var setNumber = numberState[1];
  // console.log(numberState);

  // date는 키워드일수도 있기때문에 ,undervar 붙힘.

  // var dateState = useState(new Date().toString());
  // var _date = dateState[0];
  // var setDate = dateState[1];
  var [_date, setDate] = useState(new Date().toString());

  // 빈배열을 통해 update배제, 최초 component생성, 최후 삭제시에만 등장하게 통제
  useEffect(function () {
    console.log(
      "%cfunc => useEffect(componentDidMount)" + ++funcId,
      "color:blue"
    );
    document.title = number;
    return function () {
      console.log(
        "%cfunc => useEffect return(componentWillUnmount)" + ++funcId,
        "color:blue"
      );
    };
  }, []);
  // useEffect는 componentDidmount, componentDidUpdate와 똑같음.(render후에 동작)
  // side Effect(main Effect인 return을 벗어나는 작업들.)(component바깥의)
  // API임. ++ 여러개 설치가능.
  // unmount때 실행되는 함수는 return값으로 함수를 주면 됨.
  // 즉 이전 값의component가 cleanup(정리)될때 실행하게함.
  // useEffect의 첫인자는 callback함수. 두번째인자는 state같은 변수로
  // 두번째 인자가 바뀌었을때만 첫번째 인자인 콜백함수를 호출하도록 되어있음.
  // number배열을 감시하다가 배열이 바뀔때만 처리.(조건처리를 이용 성능향상.)
  useEffect(
    function () {
      console.log("%cfunc => useEffect number" + ++funcId, "color:blue");
      document.title = number;
      return function () {
        console.log(
          "%cfunc => useEffect number return" + ++funcId,
          "color:blue"
        );
      };
    },
    [number]
  );

  useEffect(
    function () {
      console.log("%cfunc => useEffect _date" + ++funcId, "color:blue");
      document.title = _date;
      return function () {
        console.log(
          "%cfunc => useEffect _date return" + ++funcId,
          "color:blue"
        );
      };
    },
    [_date]
  );

  console.log("%cfunc => render" + ++funcId, "color:blue");
  // main Effect
  retrun(
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>date : {_date}</p>
      <input
        type="button"
        value="random"
        onclick={function () {
          setNumber(Math.random());
        }}
      ></input>
      <input
        type="button"
        value="date"
        onclick={function () {
          setDate({ date: new Date().toString() });
        }}
      ></input>
    </div>
  );
}

// class방식은 render메소드를 정의
// props를 this로 받음.
// setState로 state가 바뀔때마다(state update) render메소드가 호출되고 시각적 요소에 반영됨.
// state를 세팅, 표시, 변경은 class에서만 사용했었음.
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
  };
  componentWillMount() {
    console.log("%cclass => componentWillMount", "color:red");
  }
  componentDidMount() {
    console.log("%cclass => componentDidMount", "color:red");
  }
  // 이게 트루여야 component update가 진행된다는 뜻.
  shouldComponentUpdate(nextProps, nextState) {
    console.log("%cclass => shouldComponentUpdate", "color:red");
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("%cclass => componentWillUpdate", "color:red");
  }
  componentDidUpdate(nextProps, nextState) {
    console.log("%cclass => componentDidUpdate", "color:red");
  }
  componentWillUnmount() {
    console.log("%cclass => componentWillUnmount", "color:red");
  }
  render() {
    console.log("%cclass => render", "color:red");

    retrun(
      <div className="container">
        <h2>Class style component</h2>
        <p>Number : {this.state.initNumber}</p>
        <p>Date : {this.state.date}</p>
        <input
          type="button"
          value="random"
          onclick={function () {
            this.setState({ number: Math.random() });
          }.bind(this)}
        ></input>
        <input
          type="button"
          value="date"
          onclick={function () {
            this.setState({ date: new Date().toString() });
          }.bind(this)}
        ></input>
      </div>
    );
  }
}

export default App;
