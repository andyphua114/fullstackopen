import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Create from './Create'

test('add blog', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<Create createBlog={createBlog} />)

  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'this is a title..')
  await user.type(author, 'this is an author..')
  await user.type(url, 'this is a url..')
  screen.debug()
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('this is a title..')
  expect(createBlog.mock.calls[0][0].author).toBe('this is an author..')
  expect(createBlog.mock.calls[0][0].url).toBe('this is a url..')
})
