var apiKey = 'ab8d7152432db2327ddc6c74cb809530';
let textBoxCity = $("#city-search")
let citySearchForm = $('#form')
let currentForecast = $('#currentForecast');
var citySearchButton = $('#search');
var fiveDayForecast = $('#fiveDayForecast');
var saveLocation = $('#saveLocation');

// let citySearch = [];

citySearchButton.on("click", function (event) {
  event.preventDefault();
  // .val gets the value from the textbox - assign val to var
  var citySearches = textBoxCity.val();
  locationWeather(citySearches);

  var location = {
    location: citySearches,
  }
// stringify with JSON - set in local storage
  var saveLocation = JSON.parse(localStorage.getItem(saveLocation)) || [];

  localStorage.setItem("saveLocation", JSON.stringify(saveLocation));

  renderLocalStorage();
})

var locationWeather = function (apiSearch) {
  // fetch weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${apiSearch}&appid=${apiKey}`)
  .then(function (response) {
    if (response.ok) {
      response.json()
      .then(function (locationWeatherData) {
        displayWeather(locationWeatherData);
      })
    }
  })
  // 5 day
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${apiSearch}&appid=${apiKey}`)
  .then(function (response) {
    if (response.ok) {
      response.json()
      .then(function (locationWeatherData) {
        displayWeather(locationWeatherData);
      })
    }
  })
}

// display current weather
var displayWeather = function (apiSearch) {
 currentForecast.html("");

  var location = apiSearchData.name;
  var locationTemp = (1.8 * (apiSearchData.main.temp -273) +32).toFixed(2);
  var wind = (apiSearchData.wind.speed).toFixed(2);
  var humidity = (apiSearchData)
  var icon = apiSearchData.weather[0].icon;

  var date = moment().format("M/DD/YYYY");

  // create container
  var locationEl = $('<h2 style="color:green">');
  var locationTempEl = $('<h4 style="color:green">');
  var windEl = $('<h4 style="color:green">');
  var humidity = $('<h4 style="color:green">');
  var iconEl = $('<img>');
  var urlIcon = `http://openweathermap.org/img/w/${iconCode}.png`;

  iconElImg.attr({
    id: "icon",
    src: urlIcon,
    alt: "icon"
  })

    // location and date
  locationEl.text(`${location} (${date})`);

  // icon
  locationEl.append(iconElImg);
  currentForecast.append(locationEl);
// temperature
  locationTempEl.text(`Temp: ${locationTemp}°F`);
  currentForecast.append(locationTempEl);
// wind
  windEl.text(`Wind: ${wind} MPH`);
  currentForecast.append(windEl);
  // humidity
  humidityEl.text(`Humidity: ${humidity}%`);
  currentForecast.append(windEl);

}

var displayWeather = function (apiSearchData) {
fiveDayForecast.html("");

var fiveDayTextDiv = $('<div>')
fiveDayTextDiv.addClass(`ml-3`);

var fiveDayTextEl =$('<h3>')
fiveDayTextEl.text(`Five Day Forecast`);
fiveDayTextDiv.append(fiveDayTextEl)
fiveDayForecast.append(fiveDayTextDiv);

for (var i = 0; i <= apiSearchData.list.length; i++) {
  if (i === 4 || i === 12 || i === 20 || i ===28 || i ===36) {

    var fiveDayDivEl = $('<div>');
    fiveDayDivEl.addClass(`columns`)

    var dailyForecastEl = $('<div style="border: 3px solid bg-success">');
    dailyForecastEl.addClass("card m-2 p-1 bg-success text-white")
    var dateEl = $('<h3>');
    var locationTempEl = $('<h5>');
    var humidityEl = $('</h5>');
    var iconEl = $('<img>');

    dateEl.text(moment(apiSearchData.list[i].dt_txt).format("M/DD/YYYY"));
    fiveDayDivEl.append(dateEl);

    var icon = apiSearchData.list[i].weather[0].icon;
    var urlIcon = `http://openweathermap.org/img/w/${icon}.png`;

    iconElImg.attr({
      id: "icon",
      src: urlIcon,
      alt: "icon"
    })
fiveDayDivEl.append(iconElImg);

var locationTemp = (1.8 * (apiSearchData.main.temp -273) +32).toFixed(2);
locationTempEl.text(`Temp: ${locationTemp}°F`);
fiveDayDivEl.append(locationTempEl);

var wind = (apiSearchData.wind.speed).toFixed(2);
windEl.text(`Temp: ${wind} MPH`);
fiveDayDivEl.append(windEl);


var humidity = (apiSearchData)
humidityEl.text(`Humidity: ${humidity}%`);
fiveDayDivEl.append(humidityEl);

dailyForecastEl.append(fiveDayDivEl);
fiveDayContainer.append(dailyForecastEl);

  }
}

}

var renderLocalStorage = function () {
  saveLocation.html("");

var localStorageLocations = JSON.parse(localStorage.getItem("saveLocation")); 

for (let i= 0; i < localStorageLocations.length; i++) {
  var saveLocationEl = $('<li>');
 saveLocationEl.text(localStorageLocations[i].city);
 saveLocationEl.attr('data-location', localStorageLocations[i].location),
 saveLocationEl.addClass('list-groupp-item h-25 my-3 list-group-item-action')
 saveLocation.append(saveLocationEl); 
  
}
}

saveLocation.on('click', function(event) {
  var location = event.target.getAttribute("data-location");

  locationWeather(location);
})

renderLocalStorage();


// function getWeather() {
//   // storeWeather();
//   // console.log('hello');
//   let city =  textBoxCity.val();
//   let apiCity =
//     'https://api.openweathermap.org/data/2.5/weather?q=' +
//     city +
//     '&units=imperial&appid=' +
//     apiKey;
//   // let lat;
//   // let lon;
//   console.log(apiCity);
//   getWeatherNow(apiCity);
// }

// function getWeatherNow(apiCity) {
//   fetch(apiCity)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     cityLocation.text(`${data.name}`);
//     temp.text(
//       `${Math.trunc(data.main.temp)} ${String.fromCharCode(176)} °F`
//     );
//     wind.text(`Wind: ${data.wind.speed} MPH`);
//     humidity.text(`Humidity: ${data.main.humidity} %`)
//     let lat = data.coord.lat;
//     let lon = data.coord.lon;
//     currentForecast(lat, lon);

//   });
// }

// function forecast(lat, lon) {
//   let currentForecastApi = 
//   'https://api.openweathermap.org/data/2.5/forecast?lat=' +
//     lat +
//    '&lon=' +
//     lon +
// '&units=imperial&appid=' +
// apiKey;

// fiveDayForecast(currentForecastApi);
// }

// function fiveDayForecast(currentForecastApi) {
//   fetch(currentForecastApi)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data){
//     console.log(data)
//     let x=0;
//     for (let i =3; i < 36; i += 8) {
//       let time = data.list[i].dt_txt.split(" ");

//       document.querySelector(`#day${x}`).children[0].textContent =
//       time[0];
//       document.querySelector(
//         `#day-${x}`
//       ).children[1].textContent = `Temp: ${Math.trunc(
//         data.list[i].main.temp
//       )} ${String.fromCharCode(176)} °F`;
//       document.querySelector(
//         `day-${x}`
//       ).children[2].textContent = `Wind: ${data.list[i].wind.speed} MPH`;
//       document.querySelector(
//         `day-${x}`
//       ).children[3].textContent = `Humidity: ${data.list[i].main.humidity} %`;
//       x++; 
//     }
//   });
// }
// citySearchForm.on("submit", function (e) {
//   e.preventDefault();
//   getWeatherNow();
//   textBoxCity.val("");

// });


















