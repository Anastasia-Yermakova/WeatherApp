function convertDate(apidate) {
  let currentDate = new Date(apidate * 1000);
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
}

let searchForm = document.querySelector("#search-form");
let searchField = document.querySelector("#search-field");
let searchButton = document.querySelector("#search-button");

function getForecast(coordinates) {
  let apiKey = "5b47dc538304ta34de5207829oad0feb";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showForecast);
}

function displayWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let country = document.querySelector("#country");
  country.innerHTML = response.data.country;
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = `${Math.round(response.data.temperature.current)}&#176;C`;
  let realFeel = document.querySelector("#real-feel");
  realFeel.innerHTML = Math.round(response.data.temperature.feels_like);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let weatherConditions = document.querySelector("#weather-conditions");
  weatherConditions.innerHTML = response.data.condition.description;
  let weatherIconMain = document.querySelector("#weather-icon-main");
  let icon = `images/icons/${response.data.condition.icon}.png`;

  weatherIconMain.setAttribute("src", icon);

  getForecast(response.data.coordinates);
  convertDate(response.data.time);
  console.log(response.data.time);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  city.innerHTML = searchField.value;

  let apiKey = "5b47dc538304ta34de5207829oad0feb";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city.innerHTML}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

searchForm.addEventListener("submit", searchCity);
searchButton.addEventListener("click", searchCity);

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5b47dc538304ta34de5207829oad0feb";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
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

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row week">`;
  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col first-day">
            ${updateDay(day.time)}
            <img src="images/icons/${
              day.condition.icon
            }.png" alt="" class="weather-icon-small">
            <div class="week-degrees">
              <strong> ${Math.round(day.temperature.maximum)}&#176;</strong>
              /
              ${Math.round(day.temperature.minimum)}&#176;            
            </div>
            <span class="forecast">${day.condition.description}</span>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

locateUser();
