import { updateWeather } from './app-api'

const defaultLocation =  '#/weather?lat=-31.4135&lon=-64.18105'


/**
 * Get current location
 */
const currentLocation = () => {
  window.navigator.geolocation.getCurrentPosition(
    resp => {
      const {latitude, longitude} = resp.coords
      updateWeather(latitude,longitude)
    }, 
    err => {
      window.location.hash = defaultLocation
    }
  )
}

/**
 * @param {string} query Search query: "Córdoba"
 */
const searchedLocation = query => updateWeather.apply(null, query.split('&'))

const routes = new Map([
  ['/current-location', currentLocation],
  ['/weather', searchedLocation],
])

const checkHash = () => {
  const requestURL = window.location.hash.slice(1)

  const [route, query] = requestURL.includes ? requestURL.split('?') : [requestURL]

  routes.get(route) 
    ? routes.get(route)(query) 
    : new Response(null, {
      status: 404,
      statusText: 'No encontrado'
      });
}

window.addEventListener('hashchange', checkHash)
window.addEventListener('Load', function () {
  if(!window.location.hash) {
    window.location.hash = '#/current-location'
  } else {
    checkHash()
  }
})