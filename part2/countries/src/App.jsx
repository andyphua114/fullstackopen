import { useEffect, useState } from 'react'
import countryService from './services/countries'

const CountryForm = (props) => {
  //console.log(props)
  return (
    <div>
      find countries &nbsp;
      <input value={props.userCountry} onChange={props.handleCountry} /> &nbsp;
      <button onClick={props.toggleReset}>Reset</button>
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

const Display = (props) => {
  const allCountries = props.allCountries
  const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(props.userCountry.toLowerCase()))

  if (props.userCountry === "") {
    useEffect(() => {
      props.setOneCountry(null);
    })
    return (
      <DisplayMessage message="Enter country name" />
    )
  }
  else if (filteredCountries.length === 0) {
    useEffect(() => {
      props.setOneCountry(null);
    })
    return (
      <DisplayMessage message="No matches. Please try again" />
    )
  }
  else if (filteredCountries.length > 10) {
    useEffect(() => {
      props.setOneCountry(null);
    })
    return (
      <DisplayMessage message="Too many matches, specify another filter" />
    )
  }
  else if (filteredCountries.length === 1) {
    useEffect(() => {
      props.setOneCountry(null);
    })
    return (
      <div>
        <h2>{filteredCountries[0].name.common}</h2>
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
      </div>
    )
  }
  else if (props.oneCountry) {
    return (
      <div>
        <h2>{props.oneCountry.name.common}</h2>
        <p>capital {props.oneCountry.capital[0]}
          <br />
          area {props.oneCountry.area}
        </p>
        <h3>languages:</h3>
        <ul>
          {Object.values(props.oneCountry.languages).map(language =>
            <DisplayLanguage key={language} language={language} />
          )}
        </ul>
        <DisplayFlag flag={props.oneCountry.flags.png} />
      </div>
    )
  }
  useEffect(() => {
    props.setOneCountry(null);
  })
  return (
    <div>
      {filteredCountries.map(country => {
        return (
          <div key={country.name.common}>
            {country.name.common} &nbsp;
            <button onClick={() => props.toggleShow(country.name.common, allCountries)}>show</button>
          </div>
        )
      })

      }
    </div >
  )
}


const App = () => {

  const [userCountry, setUserCountry] = useState("")

  // to retrieve the list of all country names
  const [allCountries, setAllCountries] = useState([])

  const [oneCountry, setOneCountry] = useState(null)

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

  // show button

  const toggleShow = (name, allCountries) => {
    const filteredCountries = allCountries.filter(country => country.name.common === name)
    countryService.getOne(name).then(oneCountry => {
      setOneCountry(oneCountry)
    })
  }

  // reset button

  const toggleReset = () => {
    setOneCountry(null)
    setUserCountry("")
  }

  return (
    <div>
      <CountryForm userCountry={userCountry} handleCountry={handleCountry} toggleReset={toggleReset} />
      <Display userCountry={userCountry} allCountries={allCountries} toggleShow={toggleShow} oneCountry={oneCountry} setOneCountry={setOneCountry} />
    </div>
  )

}

export default App
