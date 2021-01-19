function displayDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let today = `${day} ${hours}:${minutes}`;

  return today;
}

let todayDate = document.querySelector("#date");
let now = new Date();
todayDate.innerHTML = displayDate(now);

function showCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "341180980d29cb519b1051ce3114fadd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let locationTemperature = document.querySelector(".temperature");
  locationTemperature.innerHTML = temperature;
}

function searchLocation(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "341180980d29cb519b1051ce3114fadd";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", searchLocation);

let currentButton = document.querySelector(`#locationButton`);
currentButton.addEventListener("click", showCurrentWeather);

searchCity("New York");
