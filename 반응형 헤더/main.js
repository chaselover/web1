const toggleBtn = document.querySelector(".navber__toogleBtn");
const menu = document.querySelector(".navbar__menu");
const icons = document.querySelector(".navbar__icons");


/*클릭했을때 메뉴와 아이콘의 클래스에 active가있으면 넣고 없으며ㅓㄴ 뺌*/
toggleBtn.addEventListener("click", () => {
    menu.classList.toggle('active');
    icons.classList.toggle('active');
});