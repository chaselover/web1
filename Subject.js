import React, { Component } from "react";

class Subject extends Component {
  // 원래 function render()이나 ES6에서 클래스안의 함수는 function 생략가능
  render() {
    // 컨포넌트를 만들시 반드시 최상위 태그로 시작해야함(같은위치 태그 여러개 붙히는거 안됨)
    // JS는 속성값 Attribute로 , react는 props로
    // 속성값을 주는게 더 효율적.(리펙토링)
    // 왜냐하면 Subject라는 컴포넌트가 늘 같은값이 아닌 속성에 따라 다른값을 뱉을 수 있게 했기 때문.
    // (용도가 더 늘어남)
    return (
      <header>
        <h1>
          <a
            href="/"
            onClick={function (e) {
              // 링크를 클릭했을때 페이지가 바뀌는것을 막고
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}
          >
            {this.props.title}
          </a>
        </h1>
        {this.props.sub}
      </header>
    );
  }
}

export default Subject;
