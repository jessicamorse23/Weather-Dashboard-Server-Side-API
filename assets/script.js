var apiKey = 'ab8d7152432db2327ddc6c74cb809530';
let textBoxCity = $('#city-search');
let citySearchForm = $('#form');
let currentForecast = $('#currentForecast');
var citySearchButton = $('#search');
var fiveDayForecast = $('#fiveDayForecast');
var saveLocation = $('#saveLocation');

// let citySearch = [];

citySearchButton.on('click', function (event) {
  event.preventDefault();
  // .val gets the value from the textbox - assign val to var
  var citySearches = textBoxCity.val();
  locationWeather(citySearches);

  var location = {
    location: citySearches,
  };
  // stringify with JSON - set in local storage
  var saveLocation = JSON.parse(localStorage.getItem(saveLocation)) || [];

  saveLocation.unshift(location);

  localStorage.setItem('saveLocation', JSON.stringify(saveLocation));

  renderLocalStorage();
});

var locationWeather = function (apiSearch) {
  // fetch weather
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${apiSearch}&appid=${apiKey}`
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (apiSearchData) {
        displayWeather(apiSearchData);
        getForecast(apiSearchData?.coord?.lat,apiSearchData?.coord.lon, apiKey)
      });
    }
  });
  // 5 day
  
};

// display current weather
var displayWeather = function (apiSearchData) {
  currentForecast.html('');

  var location = apiSearchData.name;
  var locationTemp = (1.8 * (apiSearchData.main.temp - 273) + 32).toFixed(2);
  var wind = apiSearchData.wind.speed.toFixed(2);
  var humidity = apiSearchData.main.humidty;
  var icon = apiSearchData.weather[0].icon;

  var date = moment().format('M/DD/YYYY');

  // create container
  var locationEl = $('<h2 style="color:navy">');
  var locationTempEl = $('<h4 style="color:navy">');
  var windEl = $('<h4 style="color:navy">');
  var humidityEl = $('<h4 style="color:navy">');
  var iconElImg = $('<img>');
  var urlIcon = `http://openweathermap.org/img/w/${icon}.png`;

  iconElImg.attr({
    id: 'icon',
    src: urlIcon,
    alt: 'icon',
  });

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
  currentForecast.append(humidityEl);
};

var getForecast = function (lat, lon, apiKey) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (apiSearchData) {
        console.log(apiSearchData)
        displayForecast(apiSearchData);
      });
    }
  });
}

var displayForecast = function (apiSearchData) {
  fiveDayForecast.html('');


  for (var i = 0; i <= apiSearchData.list.length; i++) {
    if (i === 4 || i === 12 || i === 20 || i === 28 || i === 36) {
      
      var fiveDayDivEl = $('<div>');
      fiveDayDivEl.addClass('columns');

      var dailyForecastEl = $('<div style="border: 5px solid bg-success">');
      dailyForecastEl.addClass('card m-2 p-1 border: 5px style="color:navy"');
      var dateEl = $('<h3>');
      var windEl = $('<h5>');
      var locationTempEl = $('<h5>');
      var humidityEl = $('<h5>');
      var iconEl = $('<img>');

      dateEl.text(moment(apiSearchData.list[i].dt_txt).format('M/DD/YYYY'));
      fiveDayDivEl.append(dateEl);

      var icon = apiSearchData.list[i].weather[0].icon;
      var urlIcon = `http://openweathermap.org/img/w/${icon}.png`;

      iconEl.attr({
        id: 'icon',
        src: urlIcon,
        alt: 'icon',
      });
      fiveDayDivEl.append(iconEl);

      var locationTemp = (1.8 * (apiSearchData.list[i].main.temp - 273) + 32).toFixed(2);
      locationTempEl.text(`Temp: ${locationTemp}°F`);
      fiveDayDivEl.append(locationTempEl);

      var wind = apiSearchData.list[i].wind.speed.toFixed(2);
      windEl.text(`Wind: ${wind} MPH`);
      fiveDayDivEl.append(windEl);

      var humidity = apiSearchData;
      humidityEl.text(`Humidity: ${humidity}%`);
      fiveDayDivEl.append(humidityEl);

      dailyForecastEl.append(fiveDayDivEl);
      fiveDayForecast.append(dailyForecastEl);
    }
  }
};

var renderLocalStorage = function () {
  saveLocation.html('');

  var localStorageLocations = JSON.parse(localStorage.getItem('saveLocation'));
console.log(localStorageLocations);

  for (let i = 0; i < localStorageLocations.length; i++) {
    var saveLocationEl = $('<li>');
    saveLocationEl.text(localStorageLocations[i].location);
    saveLocationEl.attr('data-location', localStorageLocations[i].location),
      saveLocationEl.addClass('list-group-item h-25 my-3 list-group-item-action');
    saveLocation.append(saveLocationEl);
  }
};

saveLocation.on('click', function (event) {
  var location = event.target.getAttribute('data-location');

  locationWeather(location);
});

renderLocalStorage();
