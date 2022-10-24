var APIKey = 'ab8d7152432db2327ddc6c74cb809530';
var citySearch = [];
var count = 0;
// var currentWeather = "http://api.openweathermap.org/data/2.5/weather?appid="
// var fiveDay = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=ab8d7152432db2327ddc6c74cb809530"
// var searchedCities = JSON.parse(localStorage.getItem("searchedItems")) || [];

// user input

var currentWeather = function (city) {
  $('currentWeather').empty();

  var apiCity =
    'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + APIKey;

  fetch(apiCity).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        $('#currentWeather').addClass('border');

        var cityName = $('<h2></h2>').textData[0].cityName;
        $('currentForecast').append(cityName);
        var apiURL =
          'https://api.openweathermap.org/data/2.5/onecall?lat=' +
          latitude +
          '&lon=' +
          longitude +
          '&exclude=minutely,hourly,daily,alerts&units=imperial&appid=' +
          apiKey;

        fetch(apiURL).then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              var newDate = new Date(data.current.dt * 1000).toLocaleDateString('en-US');
              $(name).append(' ' + newDate);

              var icon = data.current.weather[0].icon;
              var weatherIcon = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
              var weatherIconDisplay = $('<img></img>').attr('src', image);
              $(name).append(weatherIconDisplay);

              var temperature = $('<p></p>').text(
                'Temperature: ' + data.current.temp + '°F'
              );
              $('#currentForecast').append(temperature);

              var windSpeed = $('<p></p>').text(
                'Wind: ' + data.current.wind_speed + ' MPH'
              );
              $('#currentForecast').append(windSpeed);

              var humidity = $('<p></p>').text(
                'Humidity: ' + data.current.humidity + '%'
              );
              $('#currentForecast').append(humidity);

          
            });
          }
        }).catch(function (error) {
          alert("cannot get weather");
        });
      
      });
    }
  }).catch(function (error) {
    alert("unable to connect to open weather");
  });
  fiveDayForecast(city);
};

// Button Event Listener
$("#search-button").on("click", function (event) {
  event.preventDefault();

  var city = $("#city-history-list").val();
  if (!city-history-list.includes(city)) {
      city-history-list.push(city);
      var cities = $('<li class="list-group-item list-group-item-info"></li>').text(city);
      $('#city-history-list').append(cities);
  }
  localStorage.setItem("City", JSON.stringify(city-history-list));
  currentForecast(city);
});

// History Search List Button Listener
$("#city-history-list").on("click", ".list-group-item", function () {
  var city = JSON.parse(localStorage.getItem("City"));
  var searchHistory = $(this).text();
  for (var i = 0; i < city.length; i++) {
      if (city[i] === searchHistory) {
          currentForecast(city[i]);
      }
  }
});
