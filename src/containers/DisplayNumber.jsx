import DisplayNumber from "../components/DisplayNumber";
import { connect } from "react-redux";

// connect함수는 함수를 return함 ㄱ래서 괄호 2개
// wrapping된 component가 return됨
// 아래 주석처리된 'DisplayNumbercomponent를 자동으로 생성해 export하는 connect
// ++connect는 unit같이 따로 수동처리해줘야했던 props전달도 root에서만전달하면 바로 props형태로 displaynumber에 전달해줌
// {...this.props}부분이 그걸 실시함.

// connect의 인자는 2개 mapStateToProps(), mapDispatchToProps()
// number의 초기화, 구독, return을 한방에 해주는 함수
// return으로 전달할 props의 이름 number에 공급될 값 state.number
function mapReduxStateToReactProps(state) {
  return {
    number: state.number,
  };
}
/*
  function mapReduxDispatchToReactProps() {
    return;
  }
  이 함수는 connect가 가지는 두번째 인자로 함수명 바꿀수 있음.
  */
export default connect(mapReduxStateToReactProps)(DisplayNumber);

/*
import React, { Component } from "react";
import store from "../store";

export default class extends Component {
  state = { number: store.getState().number };
  //   store state바뀔때 통보하기위함(state를 바꿔 render를 호출해줌) 위한 constructor
  constructor(props) {
    super(props);
    //   store에 구독하고 있기땜누에 store의 state값이 바뀌면
    // 아래 콜백함수가 호출돼 state값를 세팅해줌.
    store.subscribe(
      function () {
        this.setState({ number: store.getState().number });
      }.bind(this)
    );
  }
  render() {
    //   호출된 state값을 주입해줌.
    return (
      <DisplayNumber
        number={this.state.number}
        unit={this.props.unit}
      ></DisplayNumber>
    );
  }
}
*/
