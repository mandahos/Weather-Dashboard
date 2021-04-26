
// fetch (
//     'http://api.openweathermap.org/data/2.5/forecast?q=bluffdale&units=imperial&us&mode=&appid=04f110a92c4a584f67fb0f945cc1f6e0'
// )
//variable to be read
var cities = [];

var cityFormEl=document.querySelector("#city-search-form");
var cityInputEl=document.querySelector("#city");
var weatherContainerEl=document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
//saving searches
var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};
//api
var getCityWeather = function(city){
    var apiKey = "04f110a92c4a584f67fb0f945cc1f6e0"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

//
var displayWeather = function(weather, searchCity){
   
   weatherContainerEl.textContent= "";  
   citySearchInputEl.textContent=searchCity;

   //console.log(weather);

   //date
   var currentDate = document.createElement("span")
   currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearchInputEl.appendChild(currentDate);
    //temp
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent= "Temp:" + weather.main.temp + "F";
    temperatureEl.classList = "list-group-item"

   //img
   var weatherIcon = document.createElement("img")
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   citySearchInputEl.appendChild(weatherIcon);

   var windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wnid:" + weather.wind.speed + "mph";
   windSpeedEl.classList = "list-group-item"

   weatherContainerEl.appendChild(temperatureEl);

   weatherContainerEl.appendChild(humidityEl);

   weatherContainerEl.appendChild(windSpeedEl);

  
}






//saves searches to webpage

