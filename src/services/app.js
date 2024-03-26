'use strict'

import { fechData } from "./apiConection"
import * as module from "./module"

/**
 * Add event listener on multiple elements
 * @param {NodeList} elements  element array
 * @param {string} eventType Event type: "click"
 * @param {funtion} callback  callback function
 */
const addEventOnElement = (elements, eventType, callback) => {
  for (const element of elements) element.addEventListener(eventType, callback)
}

/**
 * Toggle search in mobile device
 */

const searchView = document.querySelector("[data-search-view]")
const searchTogglers = document.querySelectorAll("[data-search-toggler]")

const toggleSearch = () => {
  searchView.classList.toggle("active")
}

addEventOnElement(searchTogglers, "click", toggleSearch)


/**
 * Search integration
 * 
 * Aqui integro de manera directa con insercion de html, ver como astro interactua con elementos del DOM que son dinamicos. Para las listas se puede aplicar el map
 */

const searchField = document.querySelector("[data-search-field]")
const searchResult = document.querySelector("[data-search-result]")

let searchTimeout = null
const searchTimeoutDuration = 500

searchField.addEventListener("input", event => {
  searchTimeout ?? clearTimeout(searchTimeout)

  if (!searchField.value) {
    searchResult.classList.remove("active")
    searchResult.innerHTML = ""
    searchField.classList.remove("searching")
  } else {
    searchField.classList.add("searching")
  }

  if (searchField.value) {
    searchTimeout = setTimeout(() => {
      fechData(URL.geo(searchField.value), function (locations) {
        searchField.classList.remove("searching")
        searchResult.classList.add("active")
        searchResult.innerHTML = `<ul>aquí va el JSON</ul>`

        const /** {NodeList} | [] */ items = []
        for (const {name, lat, lon, country, state} of locations) {
          const searchItem = document.createElement("li")
          searchItem.classList.add("view-item")
          searchItem.innerHTML = `<li>aquí va el JSON del JSON</li>`

          searchResult.querySelector('[data-search-list]').appendChild(searchItem)
          items.push(searchItem.querySelector('[data-search-toggler]'))
        }
      })
    }, searchTimeoutDuration)
  }
})