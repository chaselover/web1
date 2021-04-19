const moreBtn = document.querySelector(".info .metadata .moreBtn");
const title = document.querySelector(".info .metadata .title");

// more버튼이 클릭되면 moreBtn의 class가 클릭이 됐는지 안됐는지 토글하고
// title 클래스를 clamp추가수정
moreBtn.addEventListener("click", () => {
  moreBtn.classList.toggle("clicked");
  title.classList.toggle("clamp");
});
