function search(e) {
  e.preventDefault();
  var APIKey = "cee990f46fbf4ad59deda35558a00e4c";
  var textBoxCity = document.getElementById("text-box-city").value;

  const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + textBoxCity + "&cnt=5" + "&appid=" + APIKey;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayCurrentWeather(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayCurrentWeather(info) {
  console.log(info);
  
  //var card = document.createElement("div");
  //card.append(info.main.temp);
  document.getElementById("current_temperature").innerHTML = info.list[0].main.temp;
  document.getElementById("temp_1").innerHTML = info.list[1].main.temp;
  document.getElementById("temp_2").innerHTML = info.list[2].main.temp;
  document.getElementById("temp_3").innerHTML = info.list[3].main.temp;
  document.getElementById("temp_4").innerHTML = info.list[4].main.temp;
  document.getElementById("temp_5").innerHTML = info.list[5].main.temp;
  document.getElementById("current_wind").innerHTML = info.list[0].wind;
  document.getElementById("current_humidity").innerHTML = info.list[0].main.humidity;

  //console.log(card)
  //var firstCard = document.getElementById("first-card");
  //console.log(firstCard)
  //firstCard.append(card);
}
var submitBtn = document.getElementById("submit-button");

submitBtn.addEventListener("click", search);
