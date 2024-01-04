import React from 'react'
import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './Blog'

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
})
