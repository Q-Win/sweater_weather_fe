// This file is in the entry point in your webpack config.
import css from "./style.css"

var city = document.querySelector('.city')
var ourRequest = new XMLHttpRequest();
var apiUrl = 'https://sweater-weather-api.herokuapp.com/api/v1/'
var cityForecastButton = document.getElementById("city-forecast")

cityForecastButton.addEventListener("click",getWeatherForCity)

function getWeatherForCity(){
  ourRequest.open('GET', apiUrl + "forecast?location="+ city.value)
  ourRequest.onload = function() {
    var forecast = JSON.parse(ourRequest.responseText).data.attributes
    console.log(forecast)
    document.querySelector('.current').innerHTML = forecast.currently.summary
  };
  ourRequest.send();

  // return forecast
}

// function currentWeather(){
//   cityForecast = getWeatherForCity();
//   console.log(cityForecast)
//
// }
