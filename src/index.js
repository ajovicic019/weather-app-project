let dayTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[dayTime.getDay()];
let hours = dayTime.getHours() % 24 || 0;
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = ("0" + dayTime.getMinutes()).slice(-2);
let currentDayTime = document.querySelector("#current-day-time");
currentDayTime.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  let temperature = document.querySelector("#current-temperature");
  let celsiusTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${celsiusTemp}°`;
  let description = document.querySelector("#description");
  let weatherDescription = response.data.weather[0].description;
  description.innerHTML = `${weatherDescription}`;
  let wind = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed;
  wind.innerHTML = `Wind: ${windSpeed}km/h`;
  let humidity = document.querySelector("#humidity");
  let percentHumidity = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${percentHumidity}%   `;
}

function searchCity(city) {
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
searchCity("Belgrade");

function inputCityTemperature(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", inputCityTemperature);

function changeToCurrentCity(response) {
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  showTemperature(response);
}

function currentCityTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(changeToCurrentCity);
}

function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCityTemperature);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentCity);
