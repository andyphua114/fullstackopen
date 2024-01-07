import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    increaseVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((n) => n.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    }
  }
})

export const { increaseVote, setAnecdotes, appendAnecdotes } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    await anecdoteService.createNew(content)
    const getId = () => (100000 * Math.random()).toFixed(0)
    const asObject = {
      content,
      id: getId(),
      votes: 0
    }
    dispatch(appendAnecdotes(asObject))
  }
}

export default anecdoteSlice.reducer
