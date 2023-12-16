import { useState } from "react";

const Persons = (props) => {

  const filteredPerson = props.persons.filter(p => p.name.toLowerCase().includes(props.search.toLowerCase()))
  return (
    <>
      {filteredPerson.map(p => {
        return (
          <div key={p.id}>
            {p.name} {p.number} < br />
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [search, setSearch] = useState('')

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
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
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
      <Filter handleSearch={handleSearch} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameAdd={handleNameAdd} newNumber={newNumber} handleNumberAdd={handleNumberAdd} />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} />
    </div >
  )

}

export default App