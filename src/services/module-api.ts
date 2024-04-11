import * as Interfaces from '../types/moduleTypes';

export const weekDays : Interfaces.WeekDays = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo'
]

export const monthYear: Interfaces.Months = [
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

export const aqiText: Interfaces.AQIText = {
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

/**
 * @param dateUnix Date in seconds 
 * @param timeZone Timezone shift from UTC in seconds
 * @returns Date format: "Lunes 1, Ene"
 */
export const getDate = (dateUnix: number, timeZone: number): string => {
  const date = new Date((dateUnix + timeZone) * 1000)
  const daysName = weekDays[date.getUTCDay()]
  const monthName = monthYear[date.getUTCMonth()]

  return `${daysName} ${date.getUTCDate()}, ${monthName}`
}

/**
 * @param dateUnix Date in seconds
 * @param timeZone Timezone shift from UTC in seconds
 * @returns Time format: "00:00"
 */
export const getTime = (dateUnix: number, timeZone: number): string => {
  const date = new Date((dateUnix + timeZone) * 1000);
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  // const period = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours < 10 ? '0' + hours : hours
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
  
  return `${formattedHours}:${formattedMinutes} Hs`
}

/**
 * @param dateUnix Date in seconds
 * @param timeZone Timezone shift from UTC in seconds
 * @returns Time format: "24"
 */
export const getHours = (dateUnix: number, timeZone: number): string => {
  const date = new Date((dateUnix + timeZone) * 1000);
  const hours = date.getUTCHours();
  const formattedHours = hours < 10 ? '0' + hours : hours;

  return `${formattedHours} Hs`;
}

/**
 * Convert meters per second to kilometers per hour.
 * @param mps Meters per second
 * @returns Kilometers per hour
 */
export const mps_to_kmh = (mps: number): string => {
  return (mps * 3.6).toFixed(2);
}