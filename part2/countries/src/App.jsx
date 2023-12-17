import { useEffect, useState } from 'react'
import countryService from './services/countries'

const CountryForm = (props) => {
  //console.log(props)
  return (
    <div>
      find countries &nbsp;
      <input value={props.userCountry} onChange={props.handleCountry} />
    </div>
  )
}

const DisplayMessage = ({ message }) => {
  return (
    <div>
      {message}
    </div>
  )
}

const Display = (props) => {

  const allCountries = props.allCountries
  const filteredCountries = allCountries.filter(country => country.toLowerCase().includes(props.userCountry.toLowerCase()))

  if (props.userCountry === "") {
    return (
      <DisplayMessage message="Enter country name" />
    )
  }
  else if (filteredCountries.length === 0) {
    return (
      <DisplayMessage message="No matches. Please try again" />
    )
  }
  else if (filteredCountries.length > 10) {
    return (
      <DisplayMessage message="Too many matches, specify another filter" />
    )
  }

  return (
    <div>
      {filteredCountries.map(country => {
        return (
          <div>
            {country}
          </div>
        )
      })

      }
    </div>
  )
}

const App = () => {

  const [userCountry, setUserCountry] = useState("")

  // to retrieve the list of all country names
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    countryService.
      getAllCountryName()
      .then(allCountries => {
        setAllCountries(allCountries)
      })
  }, [])

  //console.log(allCountries)

  // user input for country
  const handleCountry = (event) => {
    //console.log(event.target.value)
    setUserCountry(event.target.value)
  }

  return (
    <div>
      <CountryForm userCountry={userCountry} handleCountry={handleCountry} />
      <Display userCountry={userCountry} allCountries={allCountries} />
    </div>
  )

}

export default App
