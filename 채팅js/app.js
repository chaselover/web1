// require쓰면 node module파일도 열기때문에 경로없이express만 가져오면됨
const express = require("express");
// 웹소캣이기때문에 http를 꼭 불러와야함
const http = require("http");
const app = express();
const path = require("path");
// express로 실행된 app을 http에 담아서 실행
const server = http.createServer(app);
const socketIO = require("socket.io")
// 소캣io 변수에 서버를 담아줌.
const io = socketIO(server);
const moment = require("moment")


// 서버가 실행되면 보여줄 "src"폴더를 지정.(html파일)
app.use(express.static(path.join(__dirname, "src")));

// 지정포트가 없으면 5000번으로 지정.
const PORT = process.env.PORT || 5000;

// connection 메소드가 이루어 지면 객체 즉 연결에 대한 정보를 socket에 담아 함수 인자로 넣음
// 소캣의 정보를 뽑아 다룰것임. 메세지는 io에 담음.
io.on("connection",(socket)=>{
    socket.on("chatting",(data)=>{
        // 여기 data는 front에서 클릭을했을때 서버로 넘겨주는 data
        const {name, msg} = data;
        // 넘겨받는 변수 name과 넘겨주는 name의 이름이 같기때문에 Es6문법에 따라 name: name -> name으로 생략처리
        io.emit("chatting", {
            name,
            msg,
            time: moment(new Date()).format("h:mm A")
        })
    })
})


// 포트 연결. 되면 뒤에문장 출력 웹서버 완성.
server.listen(PORT, ()=> console.log(`server is runnung ${PORT}`))


