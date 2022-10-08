let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wensday",
  "Thursday",
  "Friday",
  "Suterday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minut = now.getMinutes();
if (minut < 10) {
  minut = `0${minut}`;
}
currentDate.innerHTML = `${day}, ${hour}:${minut}`;

function search() {
  let searchInput = document.querySelector("#search-text-input");
  let citySearch = document.querySelector("#city");
  citySearch.innerHTML = searchInput.value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

function tempClick(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round((19 * 9) / 5 + 32);
}
let tempF = document.querySelector("#fahrenheit-link");
tempF.addEventListener("click", tempClick);

function tempCelsiusClick() {
  let temp = document.querySelector("#temperature");
  temp.innerHTML = "19";
}

let tempC = document.querySelector("#celsius-link");
tempC.addEventListener("click", tempCelsiusClick);

let apiKey = "a99a05f4d11bbb239e323bbb1d7f5d4e";
//let apiUrl =
// "https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}";
function showTemperature(responce) {
  let temperature = Math.round(responce.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}`;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = responce.data.name;
  let weatherInfo = document.querySelector("#curWeather");
  weatherInfo.innerHTML = responce.data.weather[0].main;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a99a05f4d11bbb239e323bbb1d7f5d4e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function CurrentLocTemp(event) {
  navigator.geolocation.getCurrentPosition(showPosition);

  let currentLocation = document.querySelector("#geo");
  currentLocation.addEventListener("click", CurrentLocTemp);
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", searchCity);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

CurrentLocTemp();
