import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    }
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(increaseVote(id))
  }

  const sortAnecdotes = [...anecdotes]
  sortAnecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
