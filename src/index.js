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

function displayWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let country = document.querySelector("#country");
  country.innerHTML = response.data.sys.country;
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = Math.round(response.data.main.temp);
  let realFeel = document.querySelector("#real-feel");
  realFeel.innerHTML = Math.round(response.data.main.feels_like);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let weatherConditions = document.querySelector("#weather-conditions");
  weatherConditions.innerHTML = response.data.weather[0].description;
  let weatherIconMain = document.querySelector("#weather-icon-main");
  let icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

  weatherIconMain.setAttribute("src", icon);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  city.innerHTML = searchField.value;

  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
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

//let tempUnit = document.querySelector("#switch-unit");
//let celsius = true; //meaning now I have Celsius

//function convertToF(event) {
//event.preventDefault();

//let unit = document.querySelector("#switch-unit");
//let degrees = document.querySelector("#degrees");

//if (celsius === true) {
//degrees.innerHTML = "68&#176;F";
//unit.innerHTML = "switch to C";
//celsius = false;
// } else {
//degrees.innerHTML = "27&#176;C";
//unit.innerHTML = "switch to F";
//celsius = true;
// }
//}

//tempUnit.addEventListener("click", convertToF);
