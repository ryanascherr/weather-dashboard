var apiKey = "48429ee96c9bd15088c309d848c40e29"

var searchBtn = $("#search-btn");
var listItems = document.getElementById("list-items");

var searchValue;
var currentWeatherData;
var forecast;
var queryURL;
var weatherQueryURL;
var uvQueryURL
var lat;
var lon;
var searchValueList = [];
var list = [];
var valid = false;

function setSearchValue(){
    if (valid == false){
        return;
    } else if (searchValueList) {
        if (searchValueList.includes(searchValue)){
            localStorage.setItem("searchValueList", searchValueList);
            $(".hidden").removeClass("hidden");
        } else {
            //search result added to array
            searchValueList.push(searchValue);
            //array is added to local storage
            localStorage.setItem("searchValueList", searchValueList);
            $(".hidden").removeClass("hidden");
            showListOfSearches();
        }
    } else {
        searchValueList = [];
        //search result added to array
        searchValueList.push(searchValue);
        //array is added to local storage
        localStorage.setItem("searchValueList", searchValueList);
        $(".hidden").removeClass("hidden");
        showListOfSearches();
    }
}

function showListOfSearches(){

    newListItem = localStorage.getItem("searchValueList");
    searchValueList = newListItem;
    if (searchValueList) {
        searchValueList = searchValueList.split(",");

        console.log(searchValueList);

        $("ul").empty();
        
        for (i = 0; i < searchValueList.length; i++) {
            var li = $("<li>");
            //add text to li
            li.text(searchValueList[i]);
            //add data
            li.attr("data-name", searchValueList[i])
            //add styling
            li.addClass("list-item")
            //append li to li
            $("#list-items").append(li);
        }
    }
}

function getCurrentWeather(searchValue){
    weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchValue +
    "&appid=" +
    apiKey +
    "&units=imperial";

    fetch(weatherQueryURL)
        .then(function (response){
            if (!response.ok){
                valid = false;
                $("#error-message").text("Please enter valid location name.");
                throw response.json();
            } else {
                valid = true;
                $("#error-message").text("");
                return response.json();
            }
            
        })
        .then(function (data){
            lat = data.coord.lat;
            lon = data.coord.lon;
            displayCurrentWeather(data);
            setSearchValue();
        })
}

function getForecast(searchValue){
    forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchValue +
    "&appid=" +
    apiKey +
    "&units=imperial";

    fetch(forecastQueryURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            displayForecast(data);
        })
}

function getUv(){

    uvQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+
    lat +
    "&lon=" +
    lon +
    "&exclude=hourly,daily&appid=" +
    apiKey;

    fetch(uvQueryURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            displayUv(data);
        })
}

function displayCurrentWeather(data){
    var weatherIcon = data.weather[0].icon;
    weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    $("#icon").attr("src", weatherIconURL);
    $("#current-name").text(data.name + " (" + moment().format("l") + ") ");
    $("#current-temp").text("Temperature: " + data.main.temp + " ??F");
    $("#current-humidity").text("Humidity: " + data.main.humidity + "%");
    $("#current-wind").text("Wind Speed: " + data.wind.speed + " MPH");
    getUv();
}

function displayForecast(data){
    var weatherIcon;
    var weatherIconURL;
    
    weatherIcon = data.list[7].weather[0].icon;
    weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    $(".one").children().first().text(moment().add(1, 'days').format("l"));
    $(".one").children().eq(2).text("Temp: " + data.list[7].main.temp + " ??F");
    $(".one").children().eq(3).text("Humidity: " + data.list[7].main.humidity + "%");
    $(".forecast-icon-1").attr("src", weatherIconURL);

    weatherIcon = data.list[15].weather[0].icon;
    weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    $(".two").children().first().text(moment().add(2, 'days').format("l"));
    $(".two").children().eq(2).text("Temp: " + data.list[15].main.temp + " ??F");
    $(".two").children().eq(3).text("Humidity: " + data.list[15].main.humidity + "%");
    $(".forecast-icon-2").attr("src", weatherIconURL);

    weatherIcon = data.list[23].weather[0].icon;
    weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    $(".three").children().first().text(moment().add(3, 'days').format("l"));
    $(".three").children().eq(2).text("Temp: " + data.list[23].main.temp + " ??F");
    $(".three").children().eq(3).text("Humidity: " + data.list[23].main.humidity + "%");
    $(".forecast-icon-3").attr("src", weatherIconURL);

    weatherIcon = data.list[31].weather[0].icon;
    weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    $(".four").children().first().text(moment().add(4, 'days').format("l"));
    $(".four").children().eq(2).text("Temp: " + data.list[31].main.temp + " ??F");
    $(".four").children().eq(3).text("Humidity: " + data.list[31].main.humidity + "%");
    $(".forecast-icon-4").attr("src", weatherIconURL);

    weatherIcon = data.list[39].weather[0].icon;
    weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    $(".five").children().first().text(moment().add(5, 'days').format("l"));
    $(".five").children().eq(2).text("Temp: " + data.list[39].main.temp + " ??F");
    $(".five").children().eq(3).text("Humidity: " + data.list[39].main.humidity + "%");
    $(".forecast-icon-5").attr("src", weatherIconURL);
}

function displayUv(data){
    $("#uv-text").text("UV Index: ");
    $("#uv-index").text(data.current.uvi);
    $("#uv-index").removeClass("low medium high very-high");

    if ($("#uv-index").text() < 3){
        $("#uv-index").addClass("low")
        $("#uv-index").addClass("low");
    } else if ($("#uv-index").text() < 5){
        $("#uv-index").addClass("medium");
    } else if ($("#uv-index").text() < 7){
        $("#uv-index").addClass("high");
    } else {
        $("#uv-index").addClass("very-high");
    }
}

function initialize(){
    showListOfSearches();
}

initialize();

searchBtn.click(getSearchValueInput);

function getSearchValueInput(){
    searchValue = $("#search-value").val();
    if (!searchValue) {
        return;
    } else {
        searchValue = searchValue.substr(0,1).toUpperCase()+searchValue.substr(1);
    
        getCurrentWeather(searchValue);
        getForecast(searchValue);
    }
    
}

listItems.addEventListener("click", function(event){

    var element = event.target;

    if (element.matches("li")) {
        searchValue = element.getAttribute("data-name");;

        console.log(searchValue);

        getCurrentWeather(searchValue);
        getForecast(searchValue);
        setSearchValue();

    } else {
        return;
    }
})