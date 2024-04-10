import { fetchData, URL_PATH } from "./data-api"
import * as module from "./module-api"

/**
 * Add event listener on multiple elements
 * @param elements Elements node array
 * @param eventType Event type example: 'click'
 * @param callback callback function
 */
const addEventOnElement = function (elements: NodeListOf<HTMLElement>, eventType: string, callback: () => void) {
  for (const element of elements) element.addEventListener(eventType, callback)
}


const searchView = document.querySelector('[data-search-view]') as HTMLElement | null
const searchTogglers = document.querySelectorAll('[data-search-toggler]') as NodeListOf<HTMLElement>
const searchField = document.querySelector('[data-search-field]') as HTMLInputElement | null
const searchResults = document.querySelector('[data-search-result]') as HTMLElement | null
const container = document.querySelector('[data-app]') as HTMLElement | null
const loading = document.querySelector('[data-loading]') as HTMLElement | null
const currentLocationBtn = document.querySelector('[data-current-location-btn]') as HTMLElement | null

const currentWeatherSection = document.querySelector('[data-current-weather]') as HTMLElement | null
const highlightSection = document.querySelector('[data-highlights]') as HTMLElement | null
const forecastSection = document.querySelector('[data-5-day-forecast]') as HTMLElement | null
const hourlySection = document.querySelector('[data-hourly-forecast]') as HTMLElement | null

const searchTimeoutDuration = 500
let searchTimeout = null

/**
 * Toggle search in mobile devices
 */

const toggleSearch = () => {
  if (searchView) {
    if (searchView.classList.contains("active")) {
      searchView.classList.remove("active")
      searchView.classList.toggle("hidden")
      searchView.classList.toggle("opacity-0")
    } else {
      searchView.classList.toggle("active")
      searchView.classList.remove("hidden","opacity-0")
    }
  }
}
addEventOnElement(searchTogglers, "click", toggleSearch)

/**
 * Search integration
 */

searchField.addEventListener("input", event => {
  searchTimeout ?? clearTimeout(searchTimeout)

  if (!searchField.value) {
    searchResults.classList.remove('active')
    searchResults.innerHTML = ''
      searchField.classList.remove('searching')
  } else {
    searchField.classList.add('searching')
  }

  if (searchField.value) {
    searchTimeout = setTimeout(() => {
      fetchData(URL_PATH.GEO(searchField.value), function (locations) {
        searchField.classList.remove("searching")
        searchResults.classList.add("active")
        searchResults.innerHTML = `
          <ul class="view-list pt-2 pb-4 lg:bg-surface-color xl:h-14 lg:rounded-[28px] xl:absolute xl:top-full xl:left-0 xl:w-full xl:max-h-[360px] xl:rounded-[0_0_28px_28px] xl:border-t-2 xl:border-solid xl:border-outline-color xl:overflow-y-overlay xl:empty:min-h-32" data-search-list></ul>`

        const /** {NodeList} | [] */ items: HTMLElement[] = [];

        for (const {name, lat, lon, country, state} of locations) {
          const searchItem = document.createElement("li")
          searchItem.classList.add('view-item', 'relative', 'h-16', 'flex', 'content-start', 'items-center', 'gap-4', 'ps-4', 'pe-6')
          searchItem.innerHTML = `
            <div class="text-on-surface-variant-color">
              <Icon 
              icon="pin-location" 
              width='36px' 
              heigth='36px' 
              viewBox='0 0 24 24'
              data-search-pin-icon
              />
            </div>
            <div>
              <p class="item-title">${name}</p>
              <p class="label-2 item-subtitle text-on-surface-variant-color">${state || ""}, ${country}</p>
            </div>
            <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link absolute inset-0 shadow-none hover:shadow-shadow1 focus:shadow-none focus-visible:shadow-none before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:clip-circle3 before:ease-in-out before:duration-100 hover:before:bg-white-alpha-4 focus:before:bg-white-alpha-8 focus:before:animate-ripple" data-search-toggler arial-label="${name} weather"></a>`

          searchResults.querySelector('[data-search-list]').appendChild(searchItem)
          items.push(searchItem.querySelector('[data-search-toggler]'))
        }

        const nodeListOfElements = document.querySelectorAll<HTMLElement>('[data-search-toggler]');

        addEventOnElement(nodeListOfElements, "click", function () {
          toggleSearch()
          searchResults.classList.remove("active")
        })
      })
    }, searchTimeoutDuration)
  }
})

/**
 * Render all weather data in the html page
 * @param latitude number
 * @param longitude number
 */
export const updateWeather = (latitude: number, longitude: number): void => {
  loading.classList.remove('hidden')
  loading.classList.add('flex')
  console.log(loading, 'aqui se debio haber aplicado las clases hidden y flex')
  if (container) {
    container.style.overflowY = 'hidden'
  }
  container?.classList.contains('fade-in') ?? container?.classList.remove('fade-in')

  currentWeatherSection.innerHTML = ''
  highlightSection.innerHTML = ''
  forecastSection.innerHTML = ''
  hourlySection.innerHTML = ''

  if (window.location.hash === '#/current-location') {
    currentLocationBtn.setAttribute('disabled', '')
    currentLocationBtn.classList.add('disabled')
  } else {
    currentLocationBtn.removeAttribute('disabled')
    currentLocationBtn.classList.remove('disabled')
  }

  /**
   * Current weather section
   */
  
  fetchData(URL_PATH.WEATHER(latitude, longitude), function (data) {
    const {
      weather, 
      DU: dateUnix, 
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC }, 
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      visibility,
      timezone
    } = data

    const [{description, icon}] = weather
    const card = document.createElement('div')
    card.classList.add('bg-surface-color', 'text-on-surface-color', 'rounded-[28px]', 'p-5')
    card.innerHTML = `
      <h2 class="text-h2 md:mb-4">Actual</h2>
      <div class="mb-3 flex gap-2 items-center">
        <p class="text-white text-heading leading-tight">
          ${parseInt(temp)}&deg;<sup>C</sup>
        </p>
        <Icon
          icon=${icon} 
          width='140px' 
          heigth='140px'
          viewBox='0 0 404 328'
        />
      </div>
      <p class="text-body3 capitalize">${description}</p>

      <ul class="mt-4 pt-4 border-t-[1px] border-solid border-outline-color">
        <li class="flex items-center gap-2 mb-3 text-on-surface-color">
          <Icon 
          icon="calendar"
          width='24px' 
          heigth='24px'
          viewBox='0 0 24 24'
        />
          <p class="text-h3 font-semiBold text-on-surface-variant-color">${module.getDate(dateUnix, timezone)}</p>
        </li>

        <li class="flex items-center gap-2 text-on-surface-color">
          <Icon 
            icon="pin-location" 
            width='36px' 
            heigth='36px' 
            viewBox='0 0 24 24'
          />
          <p class="text-h3 font-semiBold text-on-surface-variant-color" data-location></p>
        </li>
      </ul>
    `
    fetchData(URL_PATH.REVERSEGEO(latitude, longitude), function ([{name, country}]) {
      card.querySelector('[data-location]').innerHTML = `${name}, ${country}`
    })

    currentWeatherSection.appendChild(card)
  })
}

