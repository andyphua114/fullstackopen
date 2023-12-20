import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&"
const apiKey = import.meta.env.VITE_SOME_KEY

const getAllCountryName = () => {
    const request = axios.get(`${baseUrl}all`)
    return request.then(response => response.data)
}

const getOne = (name) => {
    const request = axios.get(`${baseUrl}name/${name}`)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    const request = axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default { getAllCountryName, getOne, getWeather }