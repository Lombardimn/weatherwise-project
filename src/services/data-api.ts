
const API_KEY = '393f2ac20fd6442e4d1af2ec5c83d52a'
const API_URL = 'https://api.openweathermap.org/data/2.5/'
const API_URL_GEO = 'https://api.openweathermap.org/geo/1.0/'

/**
 * 
 * @param {string} API_PATH
 * @param {Function} callback
 */
export const fetchData = async (API_PATH: string, callback: Function) => {
  let url: string
  const funtionPath = API_PATH.split('?')[0]
  if (funtionPath.toUpperCase() === 'REVERSE' || funtionPath.toUpperCase() === 'DIRECT') {
    url = `${API_URL_GEO}${API_PATH}&appid=${API_KEY}`
  } else {
    url = `${API_URL}${API_PATH}&appid=${API_KEY}`
  }

  try {
    const response = await fetch(url)
    const data = await response.json()
    callback(data)
  } catch(error) {
    console.error(`Error fetching data from ${url}:`, error)
  }
}

export const URL_PATH = {
  WHEATER(latitude: number, longitude: number) {
    return `weather?lat=${latitude}&lon=${longitude}`
  },
  FORECAST(latitude: number, longitude: number) {
    return `forecast?lat=${latitude}&lon=${longitude}units=metric`
  },
  AIRPOLUTION(latitude: number, longitude: number) {
    return `air_pollution?lat=${latitude}&lon=${longitude}`
  },
  REVERSEGEO(latitude: number, longitude: number) {
    return `reverse?lat=${latitude}&lon=${longitude}&limit=5`
  },
  /**
   * 
   * @param {string} query Search query example: 'London'
   * @returns 
   */
  GEO(query: string) {
    return `direct?q=${query}&limit=5`
  }
}

