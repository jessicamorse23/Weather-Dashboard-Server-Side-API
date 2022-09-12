const api = "api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=cee990f46fbf4ad59deda35558a00e4c"; 

window.addEventListener("load", () => {
    let long; 
    let lat; 
    // accessing geolocation of user
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            // store latitute and longitude in variables
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = "https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric";
            console.log(base); 

            fetch(base)
            .then(response) => {
                return response.json();
            })
            .then((data) => {
                const {description, icon} = data.weather[0];
                const {temp} =data.main;
                const {humid} = data.humid;
                const {wind} = data.wind;

                const iconUrl = "`http://openweathermap.org/img/wn/${icon}@2x.png`;"
                const fahrenheit = (temp * 9) / 5 + 32;

                const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

            });
        };
    