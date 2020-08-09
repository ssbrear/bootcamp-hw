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
// City button
var cityBtn = $(".city");
// UV Icon
var uvIcon = $("#uv-display");

//// Forcast
// Temp
var temps = $(".temp");
// Humidity
var hums = $(".humidity");
// Wind Speed
var windSpeed = $("#wind-speed")
// UV Index
var uvIndex = $("#uv-index")
// Date
var dates = $(".date")

// Variables
var curCountry = "US";
var curCity = "Austin";
var locateURL = "http://api.openweathermap.org/data/2.5/weather?APPID=96c82e4b7f44adda1b4bf872938f33c4&q=Austin,US";
var weatherURL = "";
var cityNow = {
    Lat: 0,
    Lon: 0,
    Name: "",
    Temp: "",
    Hum: 0,
    Wind: "",
    UV: 0
};
var cityForcast = []

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

cityBtn.on("click", function() {
    locateURL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_KEY + "&q=" + $(this).text().trim();
    checkWeather()
});

function checkWeather() {
    $.ajax({
        url: locateURL
    }).then(function(coordResponse) {
        cityNow.Name = coordResponse.name;
        cityNow.Lat = coordResponse.coord.lat;
        cityNow.Lon = coordResponse.coord.lon;
        weatherURL = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + cityNow.Lat +"&lon=" + cityNow.Lon +"&appid=" + API_KEY;
        $.ajax({
            url: weatherURL
        }).then(function(weatherResponse) {
            console.log(weatherResponse);
            // Current Day
            cityNow.Temp = Math.round(10*(parseFloat(weatherResponse.current.temp)))/10;
            cityNow.Wind = weatherResponse.current.wind_speed;
            cityNow.Hum = weatherResponse.current.humidity;

            // Forcast
            for (var i = 0; i < 5; i++) {
                cityForcast[i] = {
                    Temp: weatherResponse.daily[i+1].temp.day,
                    Hum: weatherResponse.daily[i+1].humidity
                }
            }

            uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + API_KEY + "&lat=" + cityNow.Lat + "&lon=" + cityNow.Lon;
            $.ajax({
                url: uvURL
            }).then(function(uvResponse) {
                cityNow.UV = uvResponse.value;
                updatePage();
            });
        });
    });
}

function updatePage() {
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

    // Update forcast
    for (var i = 0; i < 5; i++) {
        $(temps[i+1]).text(cityForcast[i].Temp);
        $(hums[i+1]).text(cityForcast[i].Hum);
        $(dates[i]).text(moment().format("MM/" + (currentDay + i + 1) + "/YYYY"));
    }
}

checkWeather();
