'use strict'

import { escapeHTML } from "astro/runtime/server/escape.js"

export const weekDaysName = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo'
]

export const monthName = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic'
]

/**
 * @param {number} dateUnix date in seconds 
 * @param {*} timeZone  timezone shift from UTC in seconds
 * @returns {string} Date formate: "Lunes 1, Ene"
 */
export const getDate = (dateUnix, timeZone) => {
  const date = new Date((dateUnix + timeZone) * 1000)
  const weekDaysName = weekDaysName[date.getUTCDay()]
  const monthName = monthName[date.getUTCMonth()]

  return `${weekDaysName} ${date.getUTCDate()}, ${monthName}`
}

/**
 * 
 * @param {number} dateUnix date in seconds
 * @param {number} timeZone timezone shift from UTC in seconds
 * @returns {string} Time formate: "00:00"
 */
export const getTime = (dateUnix, timeZone) => {
  const date = new Date((dateUnix + timeZone) * 1000)
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  // const period = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours < 10 ? '0' + hours : hours
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
  
  return `${formattedHours}:${formattedMinutes} Hs`
}

/**
 * 
 * @param {number} dateUnix date in seconds
 * @param {number} timeZone timezone shift from UTC in seconds
 * @returns {string} Time formate: "24"
 */
export const getHours = (dateUnix, timeZone) => {
  const date = new Date((dateUnix + timeZone) * 1000)
  const hours = date.getUTCHours()
  // const period = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours < 10 ? '0' + hours : hours
  
  return `${formattedHours} Hs`
}

/**
 * 
 * @param {number} mps metters per seconds
 * @returns {number} kilometers per hour
 */
export const mps_to_kmh = (mps) => {
  return (mps * 3.6).toFixed(2)
}

export const aqiText = {
  1: {
    level: 'Buena',
    message: 'La calidad del aire se considera satisfactoria y la contaminación atmosférica plantea poco o ningún riesgo.'
  },
  2: {
    level: 'Aceptable',
    message: 'La calidad del aire es aceptable; sin embargo, para algunos contaminantes puede existir una preocupación moderada para la salud de un número muy pequeño de personas que son especialmente sensibles a la contaminación del aire.'
  },
  3: {
    level: 'Moderada',
    message: 'Los miembros de grupos sensibles pueden experimentar efectos en la salud.\nEs poco probable que el público en general se vea afectado.'
  },
  4: {
    level: 'Mala',
    message: 'Todos pueden comenzar a experimentar efectos en la salud, mientras que los miembros de grupos sensibles pueden experimentar efectos más graves en la salud.'
  },
  5: {
    level: 'Deplorable',
    message: 'Advertencias de salud sobre condiciones de emergencia. Es más probable que toda la población se vea afectada.'
  }
}