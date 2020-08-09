// API key for openweathermap.org
const API_KEY = "96c82e4b7f44adda1b4bf872938f33c4";

// User Input
var userInput = $("#user-input");
// User Submit
var searchBtn = $("#search-button");
// City list
var cityList = $("#city-list");
// Country dropdown
var countryList = $("#dropdown");
// Current city
var currentCity = $("#current-city");
// UV Icon
var uvIcon = $("#uv-display");

//// Forcast
// Temp
var temps = $(".temp");
// Humidity
var hums = $(".humidity");
// Wind Speed
var windSpeed = $("#wind-speed");
// UV Index
var uvIndex = $("#uv-index");
// Date
var dates = $(".date");
// Icons
var icons = $(".icons");

// Variables
var cityNow = {
    Lat: 0,
    Lon: 0,
    Name: "Vancouver",
    Country: "CA",
    Temp: "",
    Hum: 0,
    Wind: "",
    UV: 0
};
var locateURL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_KEY + "&q=" + cityNow.Name + "," + cityNow.Country;
var weatherURL = "";
var cityForcast = []
var checkingStorage = false;

// Local Storage
var historyList = [];

// When user searches for a city
searchBtn.on("click", function() {
    // Flashes color of icon to indicate search button was clicked
    $(".fa-search").css("color", "white");
    setTimeout(function() {$(".fa-search").css("color", "black")}, 100)

    if (userInput.val() == "") {return}

    // Calls API function
    locateURL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_KEY + "&q=" + userInput.val() + "," + countryList.val();
    checkWeather()
})

function checkWeather() {
    $.ajax({
        url: locateURL
    }).then(function(coordResponse) {
        cityNow.Name = coordResponse.name;
        cityNow.Country = coordResponse.sys.country;
        cityNow.Lat = coordResponse.coord.lat;
        cityNow.Lon = coordResponse.coord.lon;
        console.log(cityNow);
        weatherURL = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + cityNow.Lat +"&lon=" + cityNow.Lon +"&appid=" + API_KEY;
        $.ajax({
            url: weatherURL
        }).then(function(weatherResponse) {
            // Current Day
            cityNow.Temp = Math.round(10*(parseFloat(weatherResponse.current.temp)))/10;
            cityNow.Wind = weatherResponse.current.wind_speed;
            cityNow.Hum = weatherResponse.current.humidity;

            // Forcast
            for (var i = 0; i < 5; i++) {
                cityForcast[i] = {
                    Temp: weatherResponse.daily[i+1].temp.day,
                    Hum: weatherResponse.daily[i+1].humidity,
                    Icon: weatherResponse.daily[i+1].weather[0].icon
                }
            }

            uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + API_KEY + "&lat=" + cityNow.Lat + "&lon=" + cityNow.Lon;
            $.ajax({
                url: uvURL
            }).then(function(uvResponse) {
                cityNow.UV = uvResponse.value;
                updateWeather();
            });
        });
    });
}

function updateWeather() {
    // Update Main Card
    var currentDay = parseInt(moment().format("DD"));
    currentCity.text(cityNow.Name + " (" + moment().format("MM/" + currentDay + "/YYYY") + ")");
    $(temps[0]).text(cityNow.Temp);
    $(hums[0]).text(cityNow.Hum);
    windSpeed.text(cityNow.Wind);

    uvIndex.text(cityNow.UV);
    var indexNum = parseFloat(uvIndex.text());
    if (indexNum <= 3) {
        uvIcon.css("color", "green");
    } else if (indexNum < 6) {
        uvIcon.css("color", "yellow");
    } else if (indexNum < 8) {
        uvIcon.css("color", "orange");
    } else if (indexNum < 11) {
        uvIcon.css("color", "red");
    } else {
        uvIcon.css("color", "purple");
    }

    // Update Forcast
    for (var i = 0; i < 5; i++) {
        $(temps[i+1]).text(cityForcast[i].Temp);
        $(hums[i+1]).text(cityForcast[i].Hum);
        $(dates[i]).text(moment().format("MM/" + (currentDay + i + 1) + "/YYYY"));
        $(icons[i]).attr("src", "http://openweathermap.org/img/wn/" + cityForcast[i].Icon + "@2x.png")
    }
    
    updateList();
}

function updateList() {
    userInput.val("");
    var newCity = $("<button>");
    newCity.addClass("city cell");
    newCity.text(cityNow.Name + ", " + cityNow.Country);
    cityList.prepend(newCity);
    newCity.on("click", function() {
        locateURL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_KEY + "&q=" + $(this).text().trim();
        checkWeather()
    });
    if (cityList.children().length > 8) {
        $(".city:last-child").remove();
    }

    // Update array
    historyList.unshift(newCity.text());
    if (historyList.length > 8) {
        historyList.pop();
    }
    // Pass array into storage
    localStorage.setItem("historyList", JSON.stringify(historyList));
}

function checkStorage() {
    var storageHistory = JSON.parse(localStorage.getItem("historyList"));
    if (storageHistory == null) {
        return
    }
    for (var i = 0; i < storageHistory.length; i++) {
        var str = storageHistory[storageHistory.length - (1 + i)];
        var splitStr = str.split(",");
        splitStr[1] = splitStr[1].trim();
        cityNow.Name = splitStr[0];
        cityNow.Country = splitStr[1];
        updateList();
    }
}

checkStorage();
