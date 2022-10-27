let apiKey = 'ab8d7152432db2327ddc6c74cb809530';
let temp = document.querySelector('#temp');
let humidity = document.querySelector('#humidity');
let wind = document.querySelector('#wind');
let currentWeather = document.querySelector('#current-weather');
let currentIcon = document.querySelector('#current-icon');
// let searchedCities = JSON.parse(localStorage.getItem('city'));
var citySearchButton = document.querySelector('#search');
// let citySearch = [];
let current = moment().format('MM/DD/YYYY');

function getWeather() {
  // storeWeather();
  console.log('hello');
  // let city = document.getElementById('search-city').value;
  // let apiCity =
  //   'https://api.openweathermap.org/data/2.5/weather?q=' +
  //   city +
  //   '&units=imperial&appid=' +
  //   apiKey;
  // let lat;
  // let lon;
  // console.log(apiCity);

  // currentWeather.textContent = '';
  // currentIcon.textContent = '';
  // temp.textContent = '';
  // wind.textContent = '';
  // humidity.textContent = '';

  // fetch(apiCity)
  //   .then((response) => response.json())
  //   .then(function (data) {
  //     lat = data.coord.lat;
  //     long = data.coord.lon;
  //     let currentWeatherApi =
  //       'https://api.openweathermap.org/data/2.5/forecast?lat=' +
  //       lat +
  //       '&lon=' +
  //       lon +
  //       '&units=imperial&appid=' +
  //       apiKey;

  // fetch(currentWeatherApi)
  //   .then((responseApiCity) => responseApiCity.json())
  //   .then(function (cityData) {
  //     console.log(cityData);
  //     postData(data, cityData);
  //     return cityData;
  //   });
  // });
}

citySearchButton.addEventListener('click', getWeather);
