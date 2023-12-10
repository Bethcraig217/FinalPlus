let now = new Date();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let hours = now.getHours();
let minutes = now.getMinutes();
let amPm = hours >= 12 ? "PM" : "AM";

hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
hours = hours < 10 ? +hours : hours;
minutes = minutes < 10 ? "0" + minutes : minutes;

let currentDay = days[now.getDay()];
let h5 = document.querySelector("#current-time");
h5.innerHTML = `${currentDay} ${hours}:${minutes} ${amPm}`;
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let h2 = document.querySelector("#city");
  if (cityInput.value) {
    h2.innerHTML = `${cityInput.value}`;
    searchCity(cityInput.value);
  } else {
    h2.innerHTML = null;
    alert("Please enter a city");
  }
}
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[date.getDay()];
  }
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
function refreshWeather(response) {
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="monIcon" />`;

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  getForecast(response.data.city)
}
function showTemp(response) {
 
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  let description = document.querySelector("#weatherDescription");

  tempElement.innerHTML = `${temperature} F°| C° `;
  description.innerHTML = `${response.data.weather[0].description}`;
}


function searchCity(city) {
  let apiKey = "1a747f2d7ac32a100bt13fab8776o6ca";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}
function getForecast(city) {
    let apiKey = "1a747f2d7ac32a100bt13fab8776o6ca";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
  }

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row justify-content-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
      <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        alt=""
        class="img-fluid"
      />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temperature.maximum
        )}°</span>
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
      </div>
    </div>
  `;
    }
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
