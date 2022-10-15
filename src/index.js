let currentDate = new Date();
console.log(currentDate);

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

let tempUnit = document.querySelector("#switch-unit");
let celsius = true;

let realCelsius = 0;

function displayWeather(response) {
  console.log(response.data);
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

  realCelsius = Math.round(response.data.main.temp);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  city.innerHTML = searchField.value;

  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
  tempUnit.innerHTML = "switch to F";
  celsius = true;
}

searchForm.addEventListener("submit", searchCity);
searchButton.addEventListener("click", searchCity);

function getPosition(position) {
  console.log(position);
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

function convertToF(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  let fahrenheit = Math.round((realCelsius * 9) / 5 + 32);

  if (celsius === true) {
    degrees.innerHTML = `${fahrenheit}&#176;F`;
    tempUnit.innerHTML = "switch to C";
    celsius = false;
  } else {
    degrees.innerHTML = `${realCelsius}&#176;C`;
    tempUnit.innerHTML = "switch to F";
    celsius = true;
  }
}

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row week">`;
  let forecastDays = ["Thursday", "Saturday", "Sunday", "Monday", "Tuesday"];
  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col first-day">
            ${day}
            <img src="images/icons/03d.png" alt="" class="weather-icon-small">
            <div class="week-degrees">
              <strong> 29&#176;</strong>/21&#176;            
            </div>
            Rainy
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

showForecast();

tempUnit.addEventListener("click", convertToF);

locateUser();
