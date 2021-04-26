
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
var formSumbitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        getfiveDay(city);
        cities.unshift({city});
        cityInputEl.value = ""; 
    }
    saveSearch();
    
}

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

   var humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"

   weatherContainerEl.appendChild(temperatureEl);

   weatherContainerEl.appendChild(humidityEl);

   weatherContainerEl.appendChild(windSpeedEl);

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUVIndex(lat, lon)
  
}

//uvindex call
var getUVIndex = function(lat, lon){
    var apiKey = "04f110a92c4a584f67fb0f945cc1f6e0"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUVIndex(data)
        });
    });
}
//uv display
var displayUVIndex = function(index){
    var UVIndexEl = document.createElement("div");
    UVIndexEl.textContent = "UV: "
    UVIndexEl.classList = "list-group-item"

    UVIndexValue = document.createElement("span")
    UVIndexValue.textContent = index.value

      UVIndexEl.appendChild(UVIndexValue);

    weatherContainerEl.appendChild(UVIndexEl);

}
//upcoming dates
var getfiveDay = function(city){
    var apiKey = "04f110a92c4a584f67fb0f945cc1f6e0"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayfiveDay(data);
        });
    });
};

var displayfiveDay = function(weather){
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "Upcoming Forecast:";

    var forecast = weather.list;
    for(var i=5; i < forecast.length; i=i+1) {
        var dailyForecast = forecast[i];

        var forecastEl= document.createElement("div");
        forecastEl.classList = "card bg-primary text-light m-2";

        console.log(dailyForecast)

        //date element for future
        var forecastDate = document.createElement("h6")
        forecastDate.textContent = moment.unix(dailyForecast.dt).format('MMM D, YY');
        forecastDate.classList = "card-header text-center"
        forecastEl.appendChild(forecastDate);

        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);
        //add icon
        forecastEl.appendChild(weatherIcon);
        //temp
        var forecastTempEl=document.createElement("span");
        forecastTempEl.classList = "card-body text-center";
        forecastTempEl.textContent = dailyForecast.main.temp + " F";
        //add temp
        forecastEl.appendChild(forecastTempEl);
        //humidity
        var forecastHumidityEl=document.createElement("span");
        forecastHumidityEl.classList = "card-body text-center";
        forecastHumidityEl.textContent = dailyForecast.main.humidity + " %" ;
        //add humidity
        forecastEl.appendChild(forecastHumidityEl);
        
        forecastContainerEl.appendChild(forecastEl);
    }
}

cityFormEl.addEventListener("submit", formSumbitHandler);


//saves searches to webpage

