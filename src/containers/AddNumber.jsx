import AddNumber from "../components/AddNumber";
import { connect } from "react-redux";
// connect api
// 얘는 state전달 props는 없고 event전달만함===2번째인자만 필요함.
// redux의dispatch를 react의 component의 props로 연결시켜주는 함수
function mapDispatchToProps(dispatch) {
  return {
    onClick: function (size) {
      dispatch({ type: "INCREMENT", size: size });
    },
  };
}
export default connect(null, mapDispatchToProps)(AddNumber);

/*
import React, { Component } from "react";
import store from "../store";

export default class extends Component {
  render() {
    return (
      // size값을 매개변수로 받아서 size에 부여해줌.
      <AddNumber
        onClick={function (size) {
          store.dispatch({ type: "INCREMENT", size: size });
        }.bind(this)}
      ></AddNumber>
    );
  }
}
*/
