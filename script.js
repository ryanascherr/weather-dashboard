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
    console.log(weatherQueryURL);

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

function getForecast(searchValue){
    forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchValue +
    "&appid=" +
    apiKey +
    "&units=imperial";
    console.log(forecastQueryURL);

    fetch(forecastQueryURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            displayForecast(data);
        })
}

function getUv(){
    uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;
    console.log(uvQueryURL);

    fetch(uvQueryURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            displayUv(data);
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

function displayUv(data){
    $("#uv-text").text("UV Index: ");
    $("#uv-index").text(data.value);

    if ($("#uv-index").text() < 3){
        $("#uv-index").addClass("low");
    } else if ($("#uv-index").text() < 5){
        $("#uv-index").addClass("medium");
    } else if ($("#uv-index").text() < 7){
        $("#uv-index").addClass("high");
    } else {
        $("#uv-index").addClass("very-high");
    }
}

searchBtn.click(getSearchValue);