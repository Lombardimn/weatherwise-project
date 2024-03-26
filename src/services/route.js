'use strict'

import {updateWheater, error404} from '../services/app.js'

const defaultLocation = '#/weather?lat=-31.4135&lon=-64.18105'

const currentLocation = () => {
  window.navigator.geolocation.getCurrentPosition(
    resp => {
      const {latitude, longitude} = resp.coords
      updateWheater(`lat=${latitude}`,`lon=${longitude}`)
  }, err => {
    window.location.hash = defaultLocation
  }
  )
}

/**
 * @param {string} query Search query: "Córdoba"
 */
const searchedLocation = query => updateWheater(...query.split('&'))

const routes = new Map([
  ['/current-location', currentLocation],
  ['/weather', searchedLocation],
])

const checkHash = () => {
  const requestURL = window.location.hash.slice(1)

  const [route, query] = requestURL.includes ? requestURL.split('?') : [requestURL]

  routes.get(route) ? routes.get(route)(query) : error404()
}

window.addEventListener('hashchange', checkHash)
window.addEventListener('Load', function () {
  if(!window.location.hash) {
    window.location.hash = '#/current-location'
  } else {
    checkHash()
  }
})