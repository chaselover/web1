import React, { Component } from "react";

// TOC = table of contents(목차)
class TOC extends Component {
  render() {
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while (i < data.length) {
      lists.push(
        // 리액트가 필요해서 넣는 key 여러개의 list를 자동으로 생성할때는 각가의 list를 구별할수있는 식별자를 넣어줘야함(id등등 key값)
        // 우리가 쓰는 app에서 필요한게 아니라 리액트 자체적으로 필요하기때문에 써야함.!!
        <li key={data[i].id}>
          <a href={"/content/" + data[i].id}>{data[i].title}</a>
        </li>
      );
      i = i + 1;
    }
    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}
// TOC.js를 가져다 쓰는 쪽에서 사용할수있게하는 코드
export default TOC;
