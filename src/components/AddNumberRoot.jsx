import React, { Component } from "react";
// components의 Addnumber에서 containers의 addnumber로 바꿔치기
// AddNumber인척하는 container component
// 화면에 나타나는것에 집중하는 presentation component와 redux와 소통하는 가짜 container component로 구성해 재사용성을 높힘
import AddNumber from "../containers/AddNumber";

export default class AddNumberRoot extends Component {
  render() {
    return (
      <div>
        <h1>Add Number Root</h1>
        <AddNumber></AddNumber>
      </div>
    );
  }
}
