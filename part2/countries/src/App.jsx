import { useEffect, useState } from 'react'
import countryService from './services/countries'

const CountryForm = (props) => {
  //console.log(props)
  return (
    <div>
      find countries &nbsp;
      <input value={props.userCountry} onChange={props.handleCountry} /> &nbsp;
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

const DisplayLanguage = ({ language }) => {
  return (
    <li>
      {language}
    </li>
  )
}

const DisplayFlag = ({ flag }) => {
  return (
    <img src={flag} width="150"></img>
  )
}

const Weather = (props) => {
  const [weather, setWeather] = useState(null)

  const filteredCountries = props.filteredCountries

  useEffect(() => {
    countryService
      .getWeather(filteredCountries[0].latlng[0], filteredCountries[0].latlng[1])
      .then(weather => setWeather(weather))
  }, [])

  if (weather) {
    return (
      <>
        {/* <p>temperature {weather.current.temp_c} Celcius</p>
      <img src={weather.current.condition.icon}></img>
      <p>wind {(weather.current.wind_mph/2.237).toFixed(2)} m/s</p> */}
        <p>temperature {weather.main.temp} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
        <p>wind {weather.wind.speed} m/s</p>
      </>
    )
  }
}


const Display = (props) => {
  // const allCountries = props.allCountries
  // const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(props.userCountry.toLowerCase()))
  const filteredCountries = props.filteredCountries
  const filteredCountriesLength = props.filteredCountries.length

  if (props.userCountry === "") {
    return (
      <DisplayMessage message="Enter country name" />
    )
  }
  else if (filteredCountriesLength === 0) {
    return (
      <DisplayMessage message="No matches. Please try again" />
    )
  }
  else if (filteredCountriesLength > 10) {
    return (
      <DisplayMessage message="Too many matches, specify another filter" />
    )
  }
  else if (filteredCountriesLength === 1) {
    return (
      <div>
        <h1>{filteredCountries[0].name.common}</h1>
        <p>capital {filteredCountries[0].capital[0]}
          <br />
          area {filteredCountries[0].area}
        </p>
        <h3>languages:</h3>
        <ul>
          {Object.values(filteredCountries[0].languages).map(language =>
            <DisplayLanguage key={language} language={language} />
          )}
        </ul>
        <DisplayFlag flag={filteredCountries[0].flags.png} />
        <Weather filteredCountries={filteredCountries} />
      </div>
    )
  }
  else if ((filteredCountriesLength <= 10) && (!props.show)) {
    return (
      <div>
        {filteredCountries.map(country => {
          return (
            <div key={country.name.common}>
              {country.name.common} &nbsp;
              <button onClick={() => props.toggleShow(country.name.common)}>show</button>
            </div>
          )
        })
        }
      </div >
    )
  }
  // else if (props.show) {
  //   return (
  //     <div>
  //       <h1>{props.oneCountry.name.common}</h1>
  //       <p>capital {props.oneCountry.capital[0]}
  //         <br />
  //         area {props.oneCountry.area}
  //       </p>
  //       <h3>languages:</h3>
  //       <ul>
  //         {Object.values(props.oneCountry.languages).map(language =>
  //           <DisplayLanguage key={language} language={language} />
  //         )}
  //       </ul>
  //       <DisplayFlag flag={props.oneCountry.flags.png} />
  //       <h2>Weather in {props.oneCountry.capital[0]}</h2>
  //       <p>temperature {props.weather.main.temp} Celcius</p>
  //       <img src={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}></img>
  //       <p>wind {props.weather.wind.speed} m/s</p>
  //     </div>
  //   )
  // }
}


const App = () => {

  const [userCountry, setUserCountry] = useState("")

  // to retrieve the list of all country names
  const [allCountries, setAllCountries] = useState([])

  const [oneCountry, setOneCountry] = useState(null)

  const [show, setShow] = useState(null)

  useEffect(() => {
    countryService.
      getAllCountryName()
      .then(allCountries => {
        setAllCountries(allCountries)
      })
  }, [])

  // user input for country
  const handleCountry = (event) => {
    setUserCountry(event.target.value)
  }

  // show button
  const toggleShow = (name) => {
    countryService.getOne(name).then(oneCountry => {
      setOneCountry(oneCountry)
      setShow(true)
    })
  }

  // reset the show when user change input
  useEffect(() => {
    setShow(null);
  }, [userCountry])

  let filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(userCountry.toLowerCase()))

  if (show) {
    filteredCountries = [oneCountry]
  }

  return (
    <div>
      <CountryForm userCountry={userCountry} handleCountry={handleCountry} />
      <Display userCountry={userCountry} filteredCountries={filteredCountries} toggleShow={toggleShow} oneCountry={oneCountry} setOneCountry={setOneCountry} show={show} />
    </div>
  )

}

export default App