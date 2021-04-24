import React, { Component } from "react";

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc,
    };
    // 아래쪽에 bind(this)계속 쓰지 않기위한 치환 ===>>> 리팩토링
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e) {
    // 대괄호 문법을 쓰면 변수 object e가 들어온 targetname값을 가져옴(title? desc?)
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <article>
        <h2>Update</h2>
        {/*form태그는 submit버튼을 클릭했을시 action에 의해 페이지가 전환됨
          하지만 우리는 페이지 전환을 하지않는 앱을 만들고 있으므로 preventdefault설정.*/}
        <form
          action="/createe_process"
          method="post"
          onSubmit={function (e) {
            e.preventDefault();
            // 타이틀이랑 디스크립션 변수 어떻게 가져올꺼야?clg(e)해보면 다 나옴..target은 form 태그
            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
            );
          }.bind(this)}
        >
          {/*눈에 안보이는 hidden */}
          <input type="hidden" name="id" value={this.state.id}></input>
          <p>
            {/* 원래 form태그는 이 데이터를 어디로 줄껀지 action속성을 줌
              ex) action="/create_process" method="post" 메소드 post로 해야 수정, 추가시 URL노출안됨
              그리고 form에 event onSubmit설치하면 그 이벤트가 실행되도록 약속함(form의 고유기능)
              placeholder은 iput타입에 값이 아무것도 안들어있을때 채워져있는 글씨.*/}
            <input
              type="text"
              name="title"
              placeholder="title"
              // props는 read only이므로 value값을 주어 변경 불가능 => state화 해서 가변으로 만들어야함
              // {this.props.data.title}를 위에 constructor에서 state화 해줌.
              // 우리 목적은 input을 바꿨을때 read-only에서 벗어나 state를 바꾸는것!
              value={this.state.title}
              // onchange를 해줘야 우리입력에 따라 state가 동적으로 바뀌게됨.
              onChange={this.inputFormHandler}
            ></input>
          </p>
          <p>
            {/*html은 textarea defualt값은 text로 넣어야하나 react는 value로 넣어야함. */}
            <textarea
              onChange={this.inputFormHandler}
              name="desc"
              placeholder="description"
              value={this.state.desc}
            ></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;
