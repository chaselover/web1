import React, { Component } from "react";
// 뒤에js는 다 생략된것.
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";
import "./App.css";

// function App() { 일단 함수형태에서 render추가해서 클래스로 바꿔놈.
// App이라는 클래스를 만들고 react가 가지고있는 component 클래스를 상속해서 만든다.
// App은 render라는 메소드를 가지고있다.
// 이거 js문법오류남. 태그 특수문자 문법처리하기 너무 귀찮아서
// 페이스북에서 jsx로 이용해 js코드로 converting해줌.
class App extends Component {
  // state의 값을 초기화시키고싶음.render이전에 보여주고 싶은 초깃값은 constructor를 만들고 그안에 작성.
  // 컴포넌트를 실행할때 거기 constructor가 있다면 초기화를 담당한다.
  constructor(props) {
    super(props);
    // 부모의 입자에선 App의 state!!!
    // state를 만들어 props의 값으로 줌.(상위 컴포넌트의 state 값을 하위 컴포넌트의 props로 주는것은 가능!)
    this.state = {
      // 상태구분 state mode
      mode: "welcome",
      subject: { title: "WEB", sub: "Word Wide Web!" },
      welcome: { title: "Welcome", desc: "Hello, React!!" },
      // contents는 배열형태 안에 object들을 넣어줬음.
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
      ],
    };
  }
  // render는 어떤HTML을 그릴껄가?를 결정하는 함수.
  // state나 props가 바뀌면 해당 컴포넌트의 render가 다시 호출되도록 약속 되어있다. 내부 컴포넌트에있는 render함수들도 다같이 호출됨
  // 즉 state나 props가 바뀌면 화면이 다시그려진다.
  render() {
    var _title,
      _desc = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === "read") {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      // TOC의 부모가 가지고 있는 state를 이용 TOC를 수정하자!
      // App은 각 컴포넌트가 어떻게 돌아가는지 알필요없음.
      // 사용자 입장에서 data라는 props로 어떤형태의 정보를 전달하면 되는지만 알면됨.
      // 사용자 입장에서!!
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
        ></Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}
export default App;
