var apiKey = 'ab8d7152432db2327ddc6c74cb809530';
let textBoxCity = $("city-search")
let citySearchForm = $('#form')
let cityLocation = $('location');
let temp = $('#temp');
let humidity = $('#humidity');
let wind = $('#wind');
let currentWeather = $('#currentForecast');
let currentIcon = $('#current-icon0');
// let searchedCities = JSON.parse(localStorage.getItem('city'));
var citySearchButton = $('#search');

// let citySearch = [];


function getWeather() {
  // storeWeather();
  // console.log('hello');
  let city = citySearchForm.val()
  let apiCity =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&units=imperial&appid=' +
    apiKey;
  // let lat;
  // let lon;
  console.log(apiCity);
  getWeatherNow(apiCity);
}

  // currentWeather.textContent = '';
  // currentIcon.textContent = '';
  // temp.textContent = '';
  // wind.textContent = '';
  // humidity.textContent = '';

function getWeatherNow(apiCity) {
  fetch(apiCity)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    cityLocation.text(`${data.name}`);
    temp.text(
      `${Math.trunc(data.main.temp)} ${String.fromCharCode(176)} °F`
    );
    wind.text(`Wind: ${data.wind.speed} MPH`);
    humidity.text(`Humidity: ${data.main.humidity} %`)
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    currentForecast(lat, lon);

  });
}

function forecast(lat, lon) {
  let currentForecastApi = 
  'https://api.openweathermap.org/data/2.5/forecast?lat=' +
    lat +
   '&lon=' +
    lon +
'&units=imperial&appid=' +
apiKey;

fiveDayForecast(currentForecastApi);
}

function fiveDayForecast(currentForecastApi) {
  fetch(currentForecastApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data){
    console.log(data)
    let x=0;
    for (let i =3; i < 36; i += 8) {
      let time = data.list[i].dt_txt.split(" ");

      document.querySelector(`#day${x}`).children[0].textContent =
      time[0];
      document.querySelector(
        `#day-${x}`
      ).children[1].textContent = `Temp: ${Math.trunc(
        data.list[i].main.temp
      )} ${String.fromCharCode(176)} °F`;
      document.querySelector(
        `day-${x}`
      ).children[2].textContent = `Wind: ${data.list[i].wind.speed} MPH`;
      document.querySelector(
        `day-${x}`
      ).children[3].textContent = `Humidity: ${data.list[i].main.humidity} %`;
      x++; 
    }
  });
}
citySearchForm.on("submit", function (e) {
  e.preventDefault();
  getWeatherNow();
  textBoxCity.val("");

});


















