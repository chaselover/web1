import React, { Component } from "react";

class Control extends Component {
  render() {
    return (
      <header>
        <ul>
          {/*링크는 페이지개념, 버튼은 operation개념 delete에 링크를 
        쓰지 않는 이유는 미리 링크를 타고 방문하는 소프트웨어가 깔려있다면 
        방문한 후에 delete가 발생할수있기때문. */}
          <li>
            <a
              href="/create"
              onClick={function (e) {
                e.preventDefault();
                this.props.onChangeMode("create");
              }.bind(this)}
            >
              create
            </a>
          </li>
          <li>
            <a
              href="/update"
              onClick={function (e) {
                e.preventDefault();
                this.props.onChangeMode("update");
              }.bind(this)}
            >
              update
            </a>
          </li>
          <li>
            <input
              onClick={function (e) {
                e.preventDefault();
                this.props.onChangeMode("delete");
              }.bind(this)}
              type="button"
              value="delete"
            ></input>
          </li>
        </ul>
      </header>
    );
  }
}

export default Control;
