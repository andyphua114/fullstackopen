import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"

const getAllCountryName = () => {
    const request = axios.get(`${baseUrl}all`)
    return request.then(response => response.data.map(country => country.name.common))
}

export default { getAllCountryName }