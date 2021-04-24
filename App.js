import React, { Component } from "react";
// 뒤에js는 다 생략된것.
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
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
    // ui에 영향주는 값이 아니어서 state를 안넣음(넣으면 비합리적 렌더링 발생)
    this.max_content_id = 3;
    // 부모의 입자에선 App의 state!!!
    // state를 만들어 props의 값으로 줌.(상위 컴포넌트의 state 값을 하위 컴포넌트의 props로 주는것은 가능!)
    this.state = {
      // 상태구분 state mode
      mode: "welcome",
      // 기본 id=2로 설정. 뭐가 본문에 나올꺼냐?
      selected_content_id: 2,
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
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1;
    }
  }
  getContent() {
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent();
      // 모드가 read일때도 readcontent로 나와야함.
      _article = (
        <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      );
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            this.max_content_id = this.max_content_id + 1;
            // this state contents를 push로 바꾸는것보다
            // concat를 써서 return(복제본)값을 setState에 받는게 차후 성능 개선에도 좋음
            var _contents = Array.from(this.state.contents);
            _contents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            // var _contents = this.state.contents.concat({
            //   id: this.max_content_id,
            //   title: _title,
            //   desc: _desc,
            // });
            // 이렇게해도 안된느건 아닌데 나중에 react성능개선이 불가능함. 그래서concat을 씀.
            // arr.concat(3) = 원소 추가(push, concat)
            // push는 원본 배열을 바꾸나 concat은 원본기반 새로운 배열(data)을 만들어return함(원본피해x)
            // state변경시에는 원본훼손 시키지 않는게 좋음.
            // 이처럼 원본을 바꾸지 않는다는것을 immutable(불변성)이라함.
            // var b = Array.from(a) a,b둘다 내용이 같은 배열이나
            // ===연산결과 false 둘은 다른배열(Array.from을쓰면 복제가 가능)
            // 복제한거에 push하면 결과는 concat과 똑같음.
            // 객체 a ={name:"fff"} 경우 var b = Object.assign({},a);쓰면됨.
            // 원본의 변경 xxx 원본의 복제와 교체oooo
            // immutable검색해서 공부해보기
            this.setState({
              contents: _contents,
              mode: "read",
              selected_content_id: this.max_content_id,
            });
          }.bind(this)}
        ></CreateContent>
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        // contents에서 selected_content _id와 같은 원소를 찾아야함(read)
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            // 복제해서 새로운 배열을 만듦(immutable)
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i = i + 1;
            }
            this.setState({
              contents: _contents,
              // update끝나면 read로 바꿔줌
              mode: "read",
            });
          }.bind(this)}
        ></UpdateContent>
      );
    }
    return _article;
  }
  // render는 어떤HTML을 그릴껄가?를 결정하는 함수.
  // state나 props가 바뀌면 해당 컴포넌트의 render가 다시 호출되도록 약속 되어있다. 내부 컴포넌트에있는 render함수들도 다같이 호출됨
  // 즉 state나 props가 바뀌면 화면이 다시그려진다.
  render() {
    return (
      // TOC의 부모가 가지고 있는 state를 이용 TOC를 수정하자!
      // App은 각 컴포넌트가 어떻게 돌아가는지 알필요없음.
      // 사용자 입장에서 data라는 props로 어떤형태의 정보를 전달하면 되는지만 알면됨.
      // 사용자 입장에서!!
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          // subject 컴포넌트 안에서 링크를 클릭했을때 우리가만든 이벤트에 설치한 함수를 호출하도록 하고싶음.
          // 이벤트 호출은 subject.js안에서 실시. 우리는 이제 이벤트 소비자가 아닌 생산자!
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        ></Subject>
        {/*<header>
          <h1>
            <a href="/" onClick={function (e) {
                // 링크를 클릭했을때 실행되도록 이벤트 설치
                e.preventDafault();
                // this.state.mode = "welcome";bind없을때 오류나는이유: event함수 내의 this는 컴포넌트를 가르키지 않고 아무것도 세팅되지않음=>undefined state오류남.
                // bind가 필요하고 setState가 필요했음.
                // 왜? state를 위처럼 직접 할당하면 안되고 setState함수에 객체형태로 값을 주어야 하는가? 특히 동적할당시!
                // 위코드는 react입장에서 state를 몰래바꾸는셈.(값을 react가 모르기때문에 rendering 할 수 없음) state는 바뀌나 react가 모르기때문에 rendering되지 않음.
                // constructor를 제외한 state변경은 무조건 setState를 통해서 해야함.
                this.setState({
                  mode:"welcome"
                });
                // bind this를 통해 this가 동작하게함.(bind(컴포넌트자체를 가리키는 객체)는 bind를 가지고있는 함수내부의 this값을 그 객체값으로 할당해줌)
              }.bind(this)}
            >
              {this.state.subject.title}
            </a>
          </h1>
          {this.state.subject.sub}
            </header>*/}
        <TOC
          // toc 컴포넌트내부의 onclick이벤트를 통해서 props의 onchangePage이벤트를 실행함.
          // 인자넘어오는게 대부분 string으로 넘어오기 때문에 js의 Number메소드를 사용해야함.
          onChangePage={function (id) {
            this.setState({ mode: "read", selected_content_id: Number(id) });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        {/*mode라는 변수로 현상태값을 호출함*/}
        <Control
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              // confirm은 확인, 취소창을 띄움
              if (window.confirm("really?")) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    // _contents배열에서 우리가 찾은i값으로부터 1개를 삭제함.
                    _contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                // 삭제완료되면 welcome으로
                this.setState({
                  mode: "welcome",
                  contents: _contents,
                });
                alert("deleted!");
              }
            } else {
              // 딜리트 아니면 그냥 페이지전환만 함/
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}
export default App;
