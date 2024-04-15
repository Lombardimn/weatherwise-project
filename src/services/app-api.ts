import { fetchData, URL_PATH } from "./data-api"
import * as module from "./module-api"
import { iconPaths } from '../utils/iconPaths';
import { translateDescription } from "./traduction-api";

interface Props {
  icon: keyof typeof iconPaths;
  color?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  transform?: string;
  loading?: string;
  alt?: string;
}

/**
 * Add event listener on multiple elements
 * @param elements Elements node array
 * @param eventType Event type example: 'click'
 * @param callback callback function
 */
const addEventOnElement = function (elements: NodeListOf<HTMLElement> | HTMLElement[], eventType: string, callback: () => void) {
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
const hourlySection = document.querySelectorAll('[data-hourly-forecast]') as NodeListOf<HTMLElement> | null

const searchTimeoutDuration = 500
let searchTimeout = null

/**
 * Toggle search in mobile devices
 */

const toggleSearch = () => {
    searchView.classList.toggle("hidden")
    searchView.classList.toggle("opacity-0")
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
            <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link absolute inset-0 shadow-none hover:shadow-shadow1 focus:shadow-none focus-visible:shadow-none before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:clip-circle3 before:ease-in-out before:duration-100 hover:before:bg-white-alpha-4 focus:before:bg-white-alpha-8 focus:before:animate-ripple" data-search-toggler arial-label="${name} weather"></a>
          `

          searchResults.querySelector('[data-search-list]').appendChild(searchItem)
          items.push(searchItem.querySelector('[data-search-toggler]'))
        }

        addEventOnElement(items, "click", function () {
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
  // loading.classList.add('flex')
  // loading.classList.toggle('hidden')
  
  // container.style.overflowY = 'hidden'
  container.classList.contains('fade-in') ?? container.classList.remove('fade-in')

  currentWeatherSection.innerHTML = ''
  highlightSection.innerHTML = ''
  // hourlySection.innerHTML = ''
  //forecastSection.innerHTML = ''

  if (window.location.hash === '#/current-location') {
    if (currentLocationBtn) {
      currentLocationBtn.classList.add('disabled')
      currentLocationBtn.setAttribute('aria-disabled', 'true');
      currentLocationBtn.setAttribute('tabindex', '-1');
    }
  } else {
    if (currentLocationBtn) {
      currentLocationBtn.classList.remove('disabled')
      currentLocationBtn.removeAttribute('aria-disabled');
      currentLocationBtn.removeAttribute('tabindex');
    }
  }

  /**
   * Current weather section
   */
  
  fetchData(URL_PATH.WEATHER(latitude, longitude), function (currentWeather) {
    const {
      weather, 
      dt: dateUnix, 
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC }, 
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      visibility,
      timezone
    } = currentWeather
    console.log(currentWeather)
    const [{icon, id}] = weather

    /**
     * Translation description
     */
    const translation = translateDescription(id);

    const cardCurrentWeather = document.createElement('div')
    cardCurrentWeather.classList.add('bg-surface-color', 'text-on-surface-color', 'rounded-[28px]', 'p-5')

    cardCurrentWeather.innerHTML = `
      <h2 class="text-h2 md:mb-4">Actual</h2>
      <div class="mb-3 flex gap-12 items-center">
          <p class="text-white text-heading leading-tight">
              ${parseInt(temp)}&deg;<sup>C</sup>
          </p>
          <div>
            <img
              src="/icons/statusWeather/${icon}.svg"
              alt=${translation}
            >
          </div>
      </div>
      <p class="text-body3 capitalize">${translation}</p>

      <ul class="mt-4 pt-4 border-t-[1px] border-solid border-outline-color">
          <li class="flex items-center gap-2 mb-3 text-on-surface-color">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  stroke="color"
                  fill="none"
              >
                <g set:html="${iconPaths['calendar']}" />
              </svg>
              <p class="text-h3 font-semiBold text-on-surface-variant-color">${module.getDate(dateUnix, timezone)}</p>
          </li>

          <li class="flex items-center gap-2 text-on-surface-color">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  stroke="color"
                  fill="currentColor"
              >
                <g set:html="${iconPaths['pin-location']}" />
              </svg>
              <p class="text-h3 font-semiBold text-on-surface-variant-color" data-location></p>
          </li>
      </ul>
    `

    fetchData(URL_PATH.REVERSEGEO(latitude, longitude), function ([{name, country}]) {
      cardCurrentWeather.querySelector('[data-location]').innerHTML = `${name}, ${country}`
    })

    currentWeatherSection.appendChild(cardCurrentWeather)


    /**
     * Today's highlights
     */

    fetchData(URL_PATH.AIRPOLUTION(latitude, longitude), function (airPollution) {
      const [{
        main: {aqi},
        components: {
          no2,
          o3,
          so2,
          pm2_5
        }
      }] = airPollution.list

      const cardHighlights = document.createElement('div')
      cardHighlights.classList.add('bg-surface-color', 'text-on-surface-color', 'rounded-[28px]', 'p-5')

      cardHighlights.innerHTML = `
        <h2 class="text-h2 mb-3 md:mb-4" id ="highlight-label">Lo destacado de Hoy</h2>
        <div class="highlight-list grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div class="highlight-card one relative bg-black-alpha-10 text-on-surface-color rounded-2xl p-4 md:p-5 lg:grid lg:grid-rows-[min-content,_1fr]">
            <h3 class="text-h3 font-semiBold text-on-surface-variant-color mb-5 lg:w-52 xl:w-full">Índice de Calidad de Aire</h3>
            <div class="wrapper flex justify-between gap-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70px"
                height="70px"
                viewBox="0 0 263 221"
                aria-hidden="true"
                stroke="color"
                fill="none"
              >
                <g set:html="${iconPaths['wind-good']}" />
              </svg>
              <ul class="card-list flex items-center flex-wrap gap-y-2">
                <li class="card-item flex items-center w-1/2 justify-end gap-1">
                  <p class="text-h1">${Number(pm2_5).toPrecision(3)}</p>
                  <p class="text-h1">PM<sub>2.5</sub></p>
                </li>
    
                <li class="card-item flex items-center w-1/2 justify-end gap-1">
                  <p class="text-h1">${Number(so2).toPrecision(3)}</p>
                  <p class="text-h1">SO<sub>2</sub></p>
                </li>
    
                <li class="card-item flex items-center w-1/2 justify-end gap-1">
                  <p class="text-h1">${Number(no2).toPrecision(3)}</p>
                  <p class="text-h1">NO<sub>2</sub></p>
                </li>
    
                <li class="card-item flex items-center w-1/2 justify-end gap-1">
                  <p class="text-h1">${Number(o3).toPrecision(3)}</p>
                  <p class="text-h1">O<sub>3</sub></p>
                </li>
              </ul>
            </div>
    
            <span class="badge aqi-${aqi} label-${aqi} text-on-surface-variant-color absolute top-4 right-4 py-2 px-12 rounded-3xl font-semiBold cursor-help md:top-5 md:right-5" title="${module.aqiText[aqi].message}">
              ${module.aqiText[aqi].level}
            </span>
    
          </div>
    
          <div class="card card-sm highlight-card two relative flex flex-col justify-between bg-black-alpha-10 text-on-surface-color rounded-2xl p-4 md:p-8">
            <h3 class="title-3 text-h3 font-semiBold mb-5">Amanecer & Atardecer</h3>
            <div class="card-list flex items-center content-center">
                <div class="card-item flex items-center w-1/2 justify-center flex-wrap gap-x-8 gap-y-16 md:gap-x-3 md:gap-y-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 307 179"
                    aria-hidden="true"
                    stroke="color"
                    fill="none"
                  >
                    <g set:html="${iconPaths['sunrise']}" />
                  </svg>
                  <div>
                    <p class="label-1 text-label text-on-surface-variant-color mb-1">Amanecer</p>
                    <p class="text-h3 lg:text-[2rem]">${module.getTime(sunriseUnixUTC, timezone)}</p>
                  </div>
                </div>
    
                <div class="card-item flex items-center w-1/2 justify-center flex-wrap gap-x-8 gap-y-16 md:gap-x-3 md:gap-y-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 313 317"
                    aria-hidden="true"
                    stroke="color"
                    fill="none"
                  >
                    <g set:html="${iconPaths['night']}" />
                  </svg>
                  <div>
                    <p class="label-1 text-label text-on-surface-variant-color mb-1">Atardecer</p>
                    <p class="text-h3 lg:text-[2rem]">${module.getTime(sunsetUnixUTC, timezone)}</p>
                  </div>
                </div>
            </div>
          </div>
    
          <div class="card card-sm highlight-card relative bg-black-alpha-10 text-on-surface-color rounded-2xl p-4 md:p-5 md:grid md:grid-rows-[min-content,_1fr]">
            <h3 class="title-3 text-h3 font-semiBold mb-5">Humedad</h3>
            <div class="wrapper flex justify-between gap-4 items-center">
              <div class="m-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 175 247"
                  aria-hidden="true"
                  stroke="color"
                  fill="none"
                >
                  <g set:html="${iconPaths['humidity']}" />
                </svg>
              </div>
              <p class="text-h1">${humidity}<sub>%</sub></p>
            </div>
          </div>
    
          <div class="card card-sm highlight-card relative bg-black-alpha-10 text-on-surface-color rounded-2xl p-4 md:p-5 md:grid md:grid-rows-[min-content,_1fr]">
            <h3 class="title-3 text-h3 font-semiBold mb-5">Presión</h3>
            <div class="wrapper flex justify-between gap-4 items-center">
              <div class="m-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 512.00 512.00"
                  aria-hidden="true"
                  stroke="color"
                  fill="none"
                  >
                  <g set:html="${iconPaths['pressure']}" />
                </svg>
              </div>
    
              <p class="text-h1">${pressure}<sub>hPa</sub></p>
            </div>
          </div>
    
          <div class="card card-sm highlight-card relative bg-black-alpha-10 text-on-surface-color rounded-2xl p-4 md:p-5 md:grid md:grid-rows-[min-content,_1fr]">
            <h3 class="title-3 text-h3 font-semiBold mb-5">Visibilidad</h3>
            <div class="wrapper flex justify-between gap-4 items-center">
              <div class="m-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                  stroke="color"
                  fill="none"
                >
                  <g set:html="${iconPaths['visibility']}" />
                </svg>
              </div>
              <p class="text-h1">${visibility / 1000}<sub>Km</sub></p>
            </div>
          </div>
    
          <div class="card card-sm highlight-card relative bg-black-alpha-10 text-on-surface-color rounded-2xl p-4 md:p-5 md:grid md:grid-rows-[min-content,_1fr]">
            <h3 class="title-3 text-h3 font-semiBold mb-5">Sensación térmica</h3>
            <div class="wrapper flex justify-between gap-4 items-center">
              <div class="m-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28px"
                  height="28px"
                  viewBox="0 0 217 342"
                  aria-hidden="true"
                  stroke="color"
                  fill="none"
                >
                  <g set:html="${iconPaths['thermostat']}" />
                </svg>
              </div>
              <p class="text-h1">${parseInt(feels_like)}&deg;<sup>C</sup></p>
            </div>
          </div>
        </div>
      `

      highlightSection.appendChild(cardHighlights)
    })
    
    /**
     * 24hs Forecast
     */

    fetchData(URL_PATH.FORECAST(latitude, longitude), function (forecast) {
      const {
        list: forecastList,
        city: { timezone }
      } = forecast

      hourlySection.forEach((element: HTMLElement) => {
        element.innerHTML = ''
        element.innerHTML = `
          <h2 class="title-2 text-h2 mb-3 md:mb-4 md:pt-8">A partir de</h2>
          <div class="slider-container overflow-x-auto -mx-4 md:mx-0">
            <ul class="slider-list flex gap-3 before:content-[''] before:min-w-1 after:content-[''] after:min-w-1 first:mb-4 md:before:content-none md:grid md:grid-cols-[repeat(7,_1fr)] md:gap-12" data-temp></ul>
  
            <ul class="slider-list flex gap-3 before:content-[''] before:min-w-1 after:content-[''] after:min-w-1 first:mb-4 md:before:content-none md:grid md:grid-cols-[repeat(7,_1fr)] md:gap-12" data-wind></ul>
          </div>
        `
        for(const [index, data] of forecastList.entries()) {
          if (index > 6) break
  
          const {
            dt: dateUnix,
            main: { temp },
            weather,
            wind: { deg: windDirection, speed: windSpeed },
          } = data
  
          const [{ description, icon }] = weather
          const windLi = document.createElement("li")
  
          windLi.classList.add("slider-item", "min-w-28", "flex", "flex-2", "md:flex-none", "md:grid")

          const dataTemp = element.querySelectorAll('[data-temp]') as NodeListOf<HTMLElement>
          const dataWind = element.querySelectorAll('[data-wind]') as NodeListOf<HTMLElement>

          dataTemp.forEach((element: HTMLElement) => {
            const tempLi = document.createElement("li")
            tempLi.classList.add("slider-item", "min-w-28", "flex", "flex-2", "md:flex-none", "md:grid")

            tempLi.innerHTML = `
              <div class="card card-sm slider-card bg-surface-color text-on-surface-color rounded-2xl p-4 text-center flex flex-col">
                <p class="body-3 text-body3">${module.getHours(dateUnix, timezone)}</p>
                <div class="weather-icon mx-auto my-3 flex-1">
                  <img
                    src="/icons/statusWeather/${icon}.svg"
                    alt=${description}
                  >
                </div>
                <p class="body-3 text-body3">${parseInt(temp)}&deg;</p>
              </div>
            `

            element.appendChild(tempLi)
          })

          dataWind.forEach((element: HTMLElement) => {
            const windLi = document.createElement("li")
            windLi.classList.add("slider-item", "min-w-28", "flex", "flex-2", "md:flex-none", "md:grid")

            windLi.innerHTML = `
              <div class="card card-sm slider-card bg-surface-color text-on-surface-color rounded-2xl p-4 text-center md:p-5 md:grid md:grid-rows-[min-content,_1fr]">
                <p class="body-3 text-body3">${module.getHours(dateUnix, timezone)}</p>
                <div class="weather-icon mx-auto my-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40px"
                    height="40px"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    stroke="color"
                    fill="none"
                    style="transform: rotate(${windDirection - 180}deg)"
                  >
                    <g set:html="${iconPaths['arrow']}" />
                  </svg>
                </div>
                <p class="body-3 text-body3">${parseInt(module.mps_to_kmh(windSpeed))} <span class="body-4">km/h<span></p>
              </div>`

            element.appendChild(windLi)
          })
        }
      })
    })
  })
}
