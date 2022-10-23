  
  var APIKey = "cee990f46fbf4ad59deda35558a00e4c";
  var city = []

  // const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + textBoxCity + "&cnt=5" + "&appid=" + APIKey;

  var citySearch = function() {
    var cityList = localStorage.getItem("city")
    if(!cityList) {
      return false;
    }
    citySearch = JSON.parse(citySearch);

    for (var i=0; i < citySearch.length; i++) {
      displayCity(citySearch[i])
      cityList.push(citySearch[i])
    }
  }

  var saveSearch = function() {
    localStorage.setItem("city", JSON.stringify(city));
  }

  var displayPastSearch = function(citySearch) {
    var cityCard = document.createElement("div");
    cityCard.setAttribute("class", "card");
    var cityName = document.createElement ("div");
    cityName.setAttribute("class", "card-city-search");
    cityName.textContent = city;

    cityCard.appendChild(cityName)

    cityCard.addEventListener("click", function () {
      getCityData(city)
    });
    searchHistory.appendChild(cityCard)
  }

    var displayCurrentWeather = function(city, data) {
    var tempCurrent = Math.round(data.current.temp);
    var humidity = Math.round(data.current.humidity);
    var wind = data.current.wind_speed;
    currentWeather.textContent = ""
    currentWeather.setAttribute("class", "col-12 col-md-8 text center");
    var cityHeader = document.createElement ("div");
    var headerDate = document.createElement("h2");
    var date = moment().format("L");

    headerDate.textContent = city + " (" + currentdate + ")";

    cityHeader.appendChild(headerDate);
    displayCurrentWeather.appendChild(cityHeader);

    var current = document.createElement("div");
    var tempElement = document.createElement("p");
    var humidityElement = document.createElement("p");
    var windElement = document.createElement("p");

    tempElement.textContent = "Temperature: " + tempCurrent + " fahrenheit";
    humidityElement.textContent = "Humidity: " + humidity + "%";
    windElement.textContent = "Wind Speed: " + windSpeed + "mph";

    current.appendChild(tempElement);
    current.appendChild(humidityElement);
    current.appendChild(windElement);

    displayCurrentWeather.appendChild(current);
    
    }

    var displayWeatherData = function(data) {
      console.log(data);
      weatherElement.textContent = "";
      var fiveDayForecast = document.getElementById("five-day");
     fiveDayForecast.textContent = "5 Day Forecast:";
    

    for (var i=1; i < 6; i++) {
      var tempForecast = Math.round(data.daily[i].temp.day);
      var humidityForecast = data.daily[i].humidity;

      var cardElement = document.createElement("div");
      cardElement.setAttribute("class", "card col-xl-2 col-md-5 col-sm-10 mx-3 my-2 bg-primary text-white text-center");

      var cardBodyElement = document.createElement("div");
      cardBodyElement.setAttribute("class", "card-body");

      var cardDate = document.createElement("h4");
      cardDate.textContent = moment().add(i, "days").format("L");

      var cardTemperature = document.createElement("p");
      cardTemperature.setAttribute("class", "card-text");
      cardTemperature.textContent = "Temperature: " +tempForecast + "fahrenheit";

      var cardHumidity = document.createElement("p");
      cardHumidity.setAttribute("class", "card-text");
      cardHumidity.textContent = "Humidity: " + humidityForecast + "%";

      cardBodyElement.appendChild(cardDate);
      cardBodyElement.appendChild(cardTemperature);
      cardBodyElement.appendChild(cardHumidity);

      cardElement.appendChild(cardBodyElement);
      forecastContainer.appendChild(cardElement);

      weatherSearch.reset();

    }
  };

  var getLocationData = function(location) {
    event.preventDefault();

    var locationUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;

    fetch(locationUrl).then(function(response){
      if (response.ok) {
        response.json().then(function(data){
          console.log(data);

          var cityName = data.name;
          var latitude = data.coord.lat;
          var longitude = data.coord.lon;

          var previousSearch = city.includes(cityName)
          if (!previousSearch) {
            city.push(cityName)
            saveCity()
            displaySearchedCity(cityName)
          }

          getForecastData(cityName, latitude, longitude);
        });

      } else {
        alert("location not found")
        weatherSearch.reset()
      }
    });
  };


    var getWeatherData = function(city,latitude,longitude) { 
      ///5-day forecast API
      var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=minutely,hourly&appid=" + APIkey;
          
      fetch(forecastUrl).then(function(response) {
          response.json().then(function(data) {
              console.log(data);
          displayCurrentData(city, data);
          displayForecastData(data);
          });
      });
  };

    weatherSearch.addEventListener("submit", function() {
      weatherSearch = weatherSearch.value.trim();
      getCityWeatherData(weatherSearch);
  })
