function search(e) {
  e.preventDefault();
  var APIKey = "cee990f46fbf4ad59deda35558a00e4c";
  var textBoxCity = document.getElementById("text-box-city").value;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + textBoxCity + "&appid=" + APIKey;

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
console.log(info) 
var card = document.createElement("div")
card.append(info.main.temp)
var firstCard = document.getElementById("first-card")
firstCard.append(card)
}
var submitBtn = document.getElementById("submit-button");

submitBtn.addEventListener("click", search);
