/**
 * @param {string} API_PATH
 * @param {Function} callback
 */
export const fetchData = (API_PATH: string, callback: Function) => {
  let url: string
  const funtionPath = API_PATH.split('?')[0]
  if (funtionPath.toUpperCase() === 'REVERSE' || funtionPath.toUpperCase() === 'DIRECT') {
    url = `${process.env.API_URL_GEO}${API_PATH}&appid=${process.env.API_KEY}`
  } else {
    url = `${process.env.API_URL}${API_PATH}&appid=${process.env.API_KEY}`
  }

  fetch(url)
    .then(response =>response.json())
    .then(data => callback(data))
    .catch(error => console.error(`Error fetching data from ${url}:`, error))
}

export const URL_PATH = {
  WEATHER(latitude: number, longitude: number) {
    return `weather?lat=${latitude}&lon=${longitude}&units=metric`
  },
  FORECAST(latitude: number, longitude: number) {
    return `forecast?lat=${latitude}&lon=${longitude}&units=metric`
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

