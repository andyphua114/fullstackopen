import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import IncreaseLike from './IncreaseLike'

// Ex 5.15
test('like button clicked twice', async () => {
  const mockHandler = jest.fn()

  render(<IncreaseLike likes={0} increaseLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
