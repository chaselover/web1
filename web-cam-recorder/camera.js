//dom
const recordButtton = document.querySelector(".record-button");
const stopButtton = document.querySelector(".stop-button");
const playButtton = document.querySelector(".play-button");
const downloadButtton = document.querySelector(".download-button");
const previewPlayer = document.querySelector("#preview");
const recordingPlayer = document.querySelector("#recording");

// 초기화
let recorder;
// 녹화내용이 담길 배열
let recordedChunks = [];
// functions
// navigator객체를 통해 web browser의 기능에 접근하고 사용할것임. stream객체는 영상객체
// mdn검색 Navigator.mediaDevices : 카메라, 마이크 ,화면공유등 현재 연결된 미디어 입력 장치에 접근할 수 있는 mediaDevices객체를 반환
// then(앞 구문이 성공하면(true면))
// captureStream은 실시간으로 preview되고있는걸 녹화하기위해 startRecording에 넘겨줌
function videoStart() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      previewPlayer.srcObject = stream;
      startRecording(previewPlayer.captureStream());
    });
  console.log(navigator);
}

function startRecording(stream) {
  // 시작누르면 배열 초기화
  recordedChunks = [];
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    recordedChunks.push(e.data);
  };
  recorder.start();
}

function stopRecording() {
  console.log(previewPlayer.srcObject.getTracks());
  previewPlayer.srcObject.getTracks().forEach((track) => track.stop());
  recorder.stop();
  console.log(recordedChunks);
}

// 구글에 javascript Blob검색. HeroPy Tech블로그 참조<<좋은 블로그임.
// webm은 web에서 돌아가는 동영상 확장자.
function playRecording() {
  const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
  recordingPlayer.src = URL.createObjectURL(recordedBlob);
  recordingPlayer.play();
  downloadButtton.href = recordingPlayer.src;
  downloadButtton.download = `recording_${new Date()}.webm`;
  console.log(recordingPlayer.src);
}

// event
recordButtton.addEventListener("click", videoStart);
stopButtton.addEventListener("click", stopRecording);
playButtton.addEventListener("click", playRecording);
