var apiKey = "48429ee96c9bd15088c309d848c40e29"

var searchBtn = $("#search-btn");
var searchValue;

function getSearchValue(){
    searchValue = $("#search-value").val();
    console.log(searchValue);
    getCurrentWeather(searchValue);
}

function getCurrentWeather(searchValue){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchValue +
    "&appid=" +
    apiKey +
    "&units=imperial";
    console.log(queryURL);

    fetch(queryURL)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
        })

    displayCurrentWeather();
}

function displayCurrentWeather(){
    
}

searchBtn.click(getSearchValue);