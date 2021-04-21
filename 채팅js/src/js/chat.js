const socket = io();


// 사용할 dom선택(querySelcetor사용하면 css선택자 그대로 사용가능)
const nickname = document.querySelector("#nickname");
const chatlist = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
// display container선택자를 선택.
const displayContainer = document.querySelector(".display-container")

// keypress를 event객체로 넘겨주고, keycode13은 엔터
chatInput.addEventListener("keypress", (event)=> {
    if(event.keycode ===13){
        send()
    }
})

// 서버에 param의 닉네임, 메세지가 object형태로 전달됨.
function send(){
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }

    socket.emit("chatting", param);
}
// 버큰 클릭하면 send실행됨.
sendButton.addEventListener("click", send)


// 입력한 채팅을 서버를 거쳐 채팅리스트에 택스트를 표시함
// 웹소캣으로 채팅을 구현함.
socket.on("chatting", (data) =>{
    // data object명이 반복되기때문에 ES6에서 제공하는 distruchering사용
    const {name, msg, time} = data;
    // limodel을 item에 인스턴스화 시킴(초기화)
    const item = new LiModel(name, msg, time);
    item.makeLi()
    // 현재 스크롤 위치를 읽어서 그 높이로 스크롤을 맞춰줄꺼임 
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})


// 메세지 보내기 constructor function 서버에서 data받을때마다 li모델을 하나씩 계속 찍어내서 ul에다가 던질꺼임.호출시킬꺼임
function LiModel(name, msg, time){
    // 내부 메서드에서 접근하기위해 받은 인자 초기화(클로져)
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>{
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent":"received")
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https://placeimg.com/50/50/any" alt="any">
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatlist.appendChild(li)
    }
}