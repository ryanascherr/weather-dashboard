var apiKey = "48429ee96c9bd15088c309d848c40e29"

var searchBtn = $("#search-btn");
var searchValue;
var currentWeatherData;
var forecast;
var queryURL;
var weatherQueryURL;
var uvQueryURL
var lat;
var lon;

function getSearchValue(){
    searchValue = $("#search-value").val();
    console.log(searchValue);
    getCurrentWeather(searchValue);
    getForecast(searchValue);
}

function getCurrentWeather(searchValue){
    weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchValue +
    "&appid=" +
    apiKey +
    "&units=imperial";
    console.log(queryURL);

    fetch(weatherQueryURL)
        .then(function (response){
            if (!response.ok){
                alert("Please enter valid location name.");
                throw response.json();
            }

            return response.json();
        })
        .then(function (data){
            console.log(data);
            lat = data.coord.lat;
            lon = data.coord.lon;
            displayCurrentWeather(data);
        })
}

function getForecast(){
    forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchValue +
    "&appid=" +
    apiKey +
    "&units=imperial";
    console.log(queryURL);

    fetch(forecastQueryURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            displayForecast(data);
        })
}

http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}

function getUv(){
    uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;

    fetch(uvQueryURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            $("#current-uv").text("UV Index: " + data.value);
        })
}

function displayCurrentWeather(data){
    $("#current-name").text(data.name + " (" + moment().format("l") + ")");
    $("#current-temp").text("Temperature: " + data.main.temp + " °F");
    $("#current-humidity").text("Humidity: " + data.main.humidity + "%");
    $("#current-wind").text("Wind Speed: " + data.wind.speed + " MPH");
    getUv();
}

function displayForecast(data){
    $(".hidden").removeClass("hidden");
    $(".test").children().eq(1).children().first().text(moment().add(1, 'days').format("l"));
    $(".test").children().eq(1).children().eq(2).text("Temp: " + data.list[7].main.temp + " °F");
    $(".test").children().eq(1).children().eq(3).text("Humidity: " + data.list[7].main.humidity + "%");
}

searchBtn.click(getSearchValue);