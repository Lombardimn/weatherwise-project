'use strict'

/**
  * fecht data from server
  * @param {string} URL API url
  * @param {function} callback callback
*/

import {API_KEY} from '../utils/.env'

export const fechData = function(URL, callback) {
  fetch(`${URL}&appid=${API_KEY}`)
    .then(res =>  res.json())
    .then(data => callback(data))
}

export const url = {
  currentWeather(lat, lon, mod = 'weather', units = 'metric', lang = 'es') {
    return `https://api.openweathermap.org/data/2.5/${mod}?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`
  },
  forecast(lat, lon, mod = 'forecast', units = 'metric', lang = 'es') {
    return `https://api.openweathermap.org/data/2.5/${mod}?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`
  },
  airPollution(lat, lon, mod = 'air_pollution') {
    return `https://api.openweathermap.org/data/2.5/${mod}?lat=${lat}&lon=${lon}`
  },
  reverseGeo(lat, lon, mod = 'reverse', limit= 5) {
    return `https://api.openweathermap.org/data/2.5/${mod}?lat=${lat}&lon=${lon}&units=${units}&limit=${limit}`
  },
  /**
   * @param {string} query Search query: "Córdoba" 
   */
  geo(query) {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`
  }
}