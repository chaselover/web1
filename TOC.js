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
          <a
            href={"/content/" + data[i].id}
            data-id={data[i].id}
            onClick={function (e) {
              e.preventDefault();
              // 여기서 중요한게 e.target.dataset.id인데 data-id값의 주소라고 할수있고
              // e object에 담겨있음. e의 target(a태그) data-id의 정보는 dataset에서 접근할수있음.거기에 id가 들어있음.
              // 여기서 위에 data-id인자 삭제하고 함수의 인자로 id값을 받는 방법도 있음
              // bind(this, data[i].id)로하면 this 뒤에값은 function의 첫번째 인자로 들어감.
              // bind가 받는 인자가 많아질수록 함수의 인자도 많아짐.
              // 이러면 onChangePage이벤트에 주는 인자도 굳이 dataset에 접근할 필요없이
              // function(id, e), onChangePage(id), bind(this, data[i].id) 로 바꿔주는걸로
              // 동작을 간단하게 할수있음.
              this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}
          >
            {data[i].title}
          </a>
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
