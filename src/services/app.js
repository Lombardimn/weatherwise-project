'use strict'

import { fechData, url } from "./apiConection"
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