const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `img/아이유${imgNumber + 1}.jpeg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

//math 모듈 random() *5(1~5까지 랜덤넘버), floor버림, ceil올림
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
