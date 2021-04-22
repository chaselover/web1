// 가장먼저 html들의 태그들을 사용할수 있도록 변수에 저장.
// 게임종료는 data-index와 실제 인덱스의 값이 모두 같을때 종료.
const container = document.querySelector(".image-container");
const startButton = document.querySelector(".start-button");
const gameText = document.querySelector(".game-text");
const playTime = document.querySelector(".play-time");

const tileCount = 16;

let tiles = [];
const dragged = {
  el: null,
  class: null,
  inex: null,
};
let isPlaying = false;
let timeInterval = null;
let time = 0;

// functions
function checkStatus() {
  const currentList = [...container.children];

  // 조건에 맞는애들만 return시키는filter
  // 넘버로 감싸서 문자열을 숫자로 변환시켜줌
  // 한줄이어서 리턴 생략, 중괄호도 생략 가능.(원래 number앞에 return 넣어서 반환명시해줘야함.)
  const unMatchedList = currentList.filter(
    (child, index) => Number(child.getAttribute("data-index")) !== index
  );
  if (unMatchedList.length === 0) {
    gameText.style.display = "block";
    isPlaying = false;
    clearInterval(timeInterval);
  }
}

function setGame() {
  isPlaying = true;
  time = 0;
  container.innerHTML = "";
  clearInterval(timeInterval);
  gameText.style.display = "none";
  // 리턴된 값이 타일즈에 담김.
  tiles = createImageTiles();
  // title에 괄호생략, 인자하나이기때문에 arrow 뒤에 중괄호도 생략
  //   섞이기 전 보여주고
  tiles.forEach((tile) => container.appendChild(tile));
  setTimeout(() => {
    container.innerHTML = "";
    shuffle(tiles).forEach((tile) => container.appendChild(tile));
    timeInterval = setInterval(() => {
      //   playtime에 이너 텍스트로 시간값을 넣어줌
      playTime.innerText = time;
      time++;
    }, 1000);
  }, 5000);
  //   2초뒤에 container초기화하고 셔플한걸로 다시 채워줌.
}

// for(var i=0;i<16;i++)반복문 써도되는데 high word array(reduce,map,filter,forEach사용)
// 빈 array 16칸 생성
// 반복문은 arrow function형태로 _값 index로 반복문 돌아감
function createImageTiles() {
  const tempArray = [];
  Array(tileCount)
    .fill()
    .forEach((_, i) => {
      // li노드(태그)를 하나 생성
      const li = document.createElement("li");
      li.setAttribute("data-index", i);
      //   li가 드래그 될 수 있게 속성세팅
      li.setAttribute("draggable", "true");
      li.classList.add(`list${i}`);
      // 이제 위에 만들어준dom에 만든li들 넣어주면 됨.
      //   container.appendChild(li);생성된 array를 temparray배열안에 push한후 tiles에 반환해줌.
      tempArray.push(li);
    });
  return tempArray;
}

function shuffle(array) {
  // index가 length부터 1씩 감소하면서 0보다 클때까지 반복.
  // random(0~1*필요한 랜덤 숫자갯수+1(1~필요숫자.xxx)하고 floor써서 소숫점 제거
  // 인덱스와 랜덤 인덱스의 자리를 바꿔줌.
  let index = array.length - 1;
  while (index > 0) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    index--;
  }
  return array;
}

// events
// 드래그 전 인덱스와 놓고 난 후 인덱스의 순서를 바꿔주고 엘리멘츠 바꿔주고할꺼임.
// 드래그를 했을때의 이벤트를 담아서 에로우함수의 인자로 갖다줌.
container.addEventListener("dragstart", (event) => {
  // isplaying false면 drag 시행x
  if (!isPlaying) return;
  // 자주나오는건 변수처리.
  const obj = event.target;
  dragged.el = obj;
  dragged.class = obj.className;
  // parentNode의 children에 인덱스 정보가 나옴,
  // indexOf는 배열에만 쓸수있음. object에는 쓸수 없음.
  // ES6문법으로 ...하면 object가 가지고있는 원소를 불러올수있음
  dragged.index = [...obj.parentNode.children].indexOf(obj);
});

container.addEventListener("dragover", (event) => {
  // element위에서 놓았을때 두 사진이 겹쳐서 eventover이 일어나지 않도록
  // event가 발생하지 않도록 함.
  event.preventDefault();
});

container.addEventListener("drop", (event) => {
  if (!isPlaying) return;
  const obj = event.target;

  if (obj.className !== dragged.class) {
    let originPlace;
    //   마지막 엘리먼트이냐? 확인하는변수 nextsibling, previoussibling 다음요소, 전요소.(el.target의 속성)
    let isLast = false;

    if (dragged.el.nextSibling) {
      //   당겨온 그 시점의 위치를 orgin에 저장
      originPlace = dragged.el.nextSibling;
    } else {
      //   nextsibling이 없을때?? = 이게 마지막 element라는뜻.
      originPlace = dragged.el.previousSibling;
      isLast = true;
    }
    //   드래그한 엘리멘트를 드랍한애 앞에다가 집어 넣어라.
    //   obj.before(dragged.el) 는 뒤로는 드래그 안됨. 드랍자리에있던 칸이 뒤로 다 밀림.
    // 아래 4줄은 앞뒤 변경 가능하게 하는 코드
    // 들어서 놓은게 앞인지 뒨지 판단해서 집어넣고
    const droppedIndex = [...obj.parentNode.children].indexOf(obj);
    dragged.index > droppedIndex
      ? obj.before(dragged.el)
      : obj.after(dragged.el);
    //   넘겨준엘리멘트자리에 있던 애를 opigin엘리멘트로 보내주는 로직.(원래 끌어온애가 있던 자리)
    //  넣은자리에있던걸 다시 내려보냄
    isLast ? originPlace.after(obj) : originPlace.before(obj);
  }
  checkStatus();
});

startButton.addEventListener("click", () => {
  setGame();
});
