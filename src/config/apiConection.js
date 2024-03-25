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
    return `https://api.openweathermap.org/data/2.5/${mod}?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}`
  }
}