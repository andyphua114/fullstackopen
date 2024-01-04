import React from 'react'
import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './Blog'

// Ex 5.13
test('blog only shows title and author', () => {
  const initialBlogs = [
    {
      title: 'This is a blog title',
      author: 'Author A',
      url: 'https://thisisablogtitle.com'
    },
    {
      title: 'Adding a second blog',
      author: 'Writer B',
      url: 'https://addingasecondblog.com'
    }
  ]
  render(<Blog blog={initialBlogs[0]} />)

  const element = screen.getByText('This is a blog title Author A')
  expect(element).toBeDefined()
  const url = screen.queryByText('https://thisisablogtitle.com')
  expect(url).toBeNull()
})

// Ex 5.14
test('blog shows title and author, url, likes when clicked on view', async () => {
  const initialBlogs = [
    {
      title: 'This is a blog title',
      author: 'Author A',
      url: 'https://thisisablogtitle.com'
    },
    {
      title: 'Adding a second blog',
      author: 'Writer B',
      url: 'https://addingasecondblog.com'
    }
  ]

  const container = render(<Blog blog={initialBlogs[0]} />).container

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blog')
  const element = screen.getByText('This is a blog title Author A')
  expect(element).toBeDefined()

  const url = screen.getByText('https://thisisablogtitle.com')
  expect(url).toBeDefined()

  const likes = await screen.findByText('likes')
  expect(likes).toBeDefined()
})
