// This file is in the entry point in your webpack config.
// import css from "./style.css"
import config from '../config.js'
//form input setup

var city = document.querySelector('.city')
var newFavorite = document.querySelector('.new-favorite')
var removeFavorite = document.querySelector('.delete-city')

//request setup
var ourRequest = new XMLHttpRequest();
var favoriteRequest = new XMLHttpRequest();
var addFavoriteRequest = new XMLHttpRequest();
var removeFavoriteRequest = new XMLHttpRequest();
var apiUrl = 'https://sweater-weather-api.herokuapp.com/api/v1/'
var apiKey = config.apiKey


//button setup
var cityForecastButton = document.getElementById("city-forecast")
var addFavoriteButton = document.getElementById("add-favorite")
var removeFavoriteButton = document.getElementById("delete-favorite")

//button function assingments
cityForecastButton.addEventListener("click",getWeatherForCity)
addFavoriteButton.addEventListener("click",addFavorite)
// removeFavoriteButton.addEventListener("click",removeFavoriteCity)


function getWeatherForCity(){
  ourRequest.open('GET', apiUrl + "forecast?location="+ city.value)
  ourRequest.onload = function() {
    var forecast = JSON.parse(ourRequest.responseText).data.attributes
    document.querySelector('.current').innerHTML = forecast.currently.summary
    document.querySelector('.current-temp').innerHTML = forecast.currently.temperature
  };
  ourRequest.send();
}

function loadFavorites(){
  favoriteRequest.open('GET', apiUrl + "/favorites?api_key="+apiKey)
  favoriteRequest.onload = function() {
    var cities = JSON.parse(favoriteRequest.responseText)
    formatCitiesData(cities.body)
  };
  favoriteRequest.send();
}

loadFavorites();

function formatCitiesData(city_array){
  for (var i=0; i<city_array.length; i++){
    var name = city_array[i].location
    var current_weather = city_array[i].current_weather
    let favoriteDiv = document.createElement('div')
    favoriteDiv.className = ('forecast')
    favoriteDiv.innerHTML = "It is currently " + current_weather + " in " + name
    favorite_cities.appendChild(favoriteDiv)
  }
}

function addFavorite(){
  console.log("adding favorite")
  addFavoriteRequest.open('POST', apiUrl + "favorites?api_key="+ apiKey + "&location="+ newFavorite.value)
  addFavoriteRequest.onload = function() {

  };
  addFavoriteRequest.send();
  loadFavorites()
}


// function removeFavoriteCity(){
//   removeFavoriteRequest.open('DELETE', apiUrl + "favorites?api_key="+apiKey"&location="+removeFavorite.value)
//   removeFavoriteRequest.onload = function() {
//
//   };
//   removeFavoriteRequest.send();
// }
