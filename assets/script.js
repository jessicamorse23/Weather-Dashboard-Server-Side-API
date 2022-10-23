  
  var APIKey = "ab8d7152432db2327ddc6c74cb809530";
  var citySearch = [];
  var count = 0;
  // var currentWeather = "http://api.openweathermap.org/data/2.5/weather?appid="
  // var fiveDay = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=ab8d7152432db2327ddc6c74cb809530"
  // var searchedCities = JSON.parse(localStorage.getItem("searchedItems")) || [];

  // user input 
  
  var currentWeather = function (city) {
    $('currentWeather').empty();

    var apiCity = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;

    fetch(apiCity).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var latitude = data[0].lat;
          var longitude = data[0].lon;
          $('#currentWeather').addClass("border");

          var cityName = $("<h2></h2>").textData[0].cityName;
        $("currentForecast").append(cityName);
      var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,daily,alerts&units=imperial&appid=" + apiKey;
        })
      }
    })
  }