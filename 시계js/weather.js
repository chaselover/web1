const weather = document.querySelector(".js-weather");
const CORDS = "coords";
const API_KEY = "f48add578e3876881ea0284e0bfd35d6";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      //data를 받아오는 형식을 우리가 실제 url입력시 나오는 data형태로 받기위한 처리
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp; //변수명temp는 console.log(json)을 통해 json파일안의 main안의 temp가 존재함을 먼저 확인
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(CORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  //지리정보 받고
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj); //지리정보 저장하고(localstorage에)
  getWeather(latitude, longitude); //지리정보 기반으로 API호출
}

function handleGeoError() {
  console.log("cant access");
}
function askForCoords() {
  //지리정보ㅓ 준다하면 성공, 안준다하면 에러
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  //coords는 한국어로 좌푯값
  const loadedCoords = localStorage.getItem(CORDS); //localstorage에서 data가져옴
  if (loadedCoords === null) {
    //data없으면 ask해서 지리정보받고
    askForCoords();
  } else {
    //이미 지리정보를 가지고있을때는?
    //getweather
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
