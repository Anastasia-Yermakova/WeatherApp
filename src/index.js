let currentDate = new Date();

let date = document.querySelector("#date");
date.innerHTML = currentDate.getDate();
let allMonths = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = document.querySelector("#month");
month.innerHTML = allMonths[currentDate.getMonth()];

let hours = document.querySelector("#hours");
hours.innerHTML = currentDate.getHours();

let minutes = document.querySelector("#minutes");
let nowMinutes = currentDate.getMinutes();

if (nowMinutes >= 10) {
  minutes.innerHTML = nowMinutes;
} else {
  minutes.innerHTML = `0${nowMinutes}`;
}

let searchForm = document.querySelector("#search-form");
let searchField = document.querySelector("#search-field");
let searchButton = document.querySelector("#search-button");

function getForecast(coordinates) {
  let apiKey = "96771e971243152d6b8948878c26adde";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showForecast);
}

function displayWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let country = document.querySelector("#country");
  country.innerHTML = response.data.sys.country;
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = `${Math.round(response.data.main.temp)}&#176;C`;
  let realFeel = document.querySelector("#real-feel");
  realFeel.innerHTML = Math.round(response.data.main.feels_like);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let weatherConditions = document.querySelector("#weather-conditions");
  weatherConditions.innerHTML = response.data.weather[0].description;
  let weatherIconMain = document.querySelector("#weather-icon-main");
  let icon = `images/icons/${response.data.weather[0].icon}.png`;

  weatherIconMain.setAttribute("src", icon);

  getForecast(response.data.coord);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  city.innerHTML = searchField.value;

  let apiKey = "96771e971243152d6b8948878c26adde";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

searchForm.addEventListener("submit", searchCity);
searchButton.addEventListener("click", searchCity);

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
  searchField.value = "";
}
function locateUser() {
  navigator.geolocation.getCurrentPosition(getPosition);
}
let locateMeIcon = document.querySelector("#my-location");
locateMeIcon.addEventListener("click", locateUser);

function updateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row week">`;
  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col first-day">
            ${updateDay(day.dt)}
            <img src="images/icons/${
              day.weather[0].icon
            }.png" alt="" class="weather-icon-small">
            <div class="week-degrees">
              <strong> ${Math.round(day.temp.max)}&#176;</strong>
              /
              ${Math.round(day.temp.min)}&#176;            
            </div>
            ${day.weather[0].description}
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

locateUser();
