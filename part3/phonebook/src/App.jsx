import { useEffect, useState } from "react";
import personService from './services/persons'
import Notification from './components/Notification'

const Persons = (props) => {

  const filteredPerson = props.persons.filter(p => p.name.toLowerCase().includes(props.search.toLowerCase()))
  return (
    <>
      {filteredPerson.map(p => {
        return (
          <div key={p.id}>
            {p.name} {p.number} &nbsp;
            <button onClick={() => props.deleteToggle(p.id)}>delete</button>
            < br />
          </div>
        )
      })
      }
    </>
  )
}

const Filter = ({ handleSearch }) => {
  return (
    <div>
      filter shown with
      <input onChange={handleSearch}></input>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name:
        <input value={props.newName} onChange={props.handleNameAdd} />
      </div>
      <div>
        number:
        <input value={props.newNumber} onChange={props.handleNumberAdd} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.
      getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      }
      )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const currentPersons = persons.map(p => p.name)

    if (currentPersons.includes(newName)) {
      //pop window

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const selectedPerson = persons.find(person => person.name === newName)
        const selectedId = selectedPerson.id
        const updatedNameObject = { ...selectedPerson, number: newNumber }
        personService
          .updatePerson(selectedId, updatedNameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setMessage(`${updatedNameObject.name} number changed`)
            setTimeout(() => { setMessage(null) }, 3000)
          })
          .catch(error => {
            setMessage(`Information of ${updatedNameObject.name} has already been removed from server`)
            setTimeout(() => { setMessage(null) }, 3000)
          }
          )
        setNewName('')
        setNewNumber('')
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${nameObject.name}`)
          setTimeout(() => { setMessage(null) }, 3000)
        }
        )
    }
  }

  const deleteToggle = (id) => {
    const person = persons.filter(person => person.id === id)[0]

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Deleted ${person.name}`)
          setTimeout(() => { setMessage(null) }, 3000)
        })
    }
  }

  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  //console.log(search);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleSearch={handleSearch} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameAdd={handleNameAdd} newNumber={newNumber} handleNumberAdd={handleNumberAdd} />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} deleteToggle={deleteToggle} />
    </div >
  )

}

export default App