import { useState } from 'react'

const Title = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Display = (props) => {
  return (
    <div>
      {props.text}
    </div>
  )
}

const DisplayVotes = (props) => {
  return (
    <div>
      has {props.text} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const anecdotesLength = anecdotes.length

  const [selected, setSelected] = useState(0)

  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))

  const Generate = () => {
    const number = Math.floor(Math.random() * anecdotesLength)
    setSelected(number)
  }

  const Vote = () => {
    const copy = [...vote]
    // increment the property 2 value by one
    copy[selected] += 1
    setVote([...copy])
  }

  const maxVote = Math.max(...vote);

  const maxVoteindex = vote.indexOf(maxVote);

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Display text={anecdotes[selected]} />
      <DisplayVotes text={vote[selected]} />
      <Button handleClick={Vote} text="vote" />
      <Button handleClick={Generate} text="next anecdote" />
      <Title text="Anecdote with most votes" />
      <Display text={anecdotes[maxVoteindex]} />
    </div>
  )
}

export default App
