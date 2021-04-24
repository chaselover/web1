import React, { Component } from "react";

class CreateContent extends Component {
  render() {
    return (
      <article>
        <h2>Create</h2>
        {/*form태그는 submit버튼을 클릭했을시 action에 의해 페이지가 전환됨
          하지만 우리는 페이지 전환을 하지않는 앱을 만들고 있으므로 preventdefault설정.*/}
        <form
          action="/create_process"
          method="post"
          onSubmit={function (e) {
            e.preventDefault();
            // 타이틀이랑 디스크립션 변수 어떻게 가져올꺼야?clg(e)해보면 다 나옴..target은 form 태그
            this.props.onSubmit(e.target.title.value, e.target.desc.value);
          }.bind(this)}
        >
          <p>
            {/* 원래 form태그는 이 데이터를 어디로 줄껀지 action속성을 줌
              ex) action="/create_process" method="post" 메소드 post로 해야 수정, 추가시 URL노출안됨
              그리고 form에 event onSubmit설치하면 그 이벤트가 실행되도록 약속함(form의 고유기능)
              placeholder은 iput타입에 값이 아무것도 안들어있을때 채워져있는 글씨.*/}
            <input type="text" name="title" placeholder="title"></input>
          </p>
          <p>
            <textarea name="desc" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default CreateContent;
