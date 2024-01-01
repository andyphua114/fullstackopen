const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog.js');
const User = require('../models/user');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body;

  const user = request.user;
  let likes = 0;

  if (Object.keys(body).includes('likes')) {
    likes = body.likes;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user.id,
    url: body.url,
    likes: likes
  });

  const savedBlog = await blog.save();
  await savedBlog.populate('user', { username: 1, name: 1 });

  // update the user notes array with the new created note id
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const body = request.body;

  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: 'invalid user deleting blog' });
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { user, title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      user,
      title,
      author,
      url,
      likes
    },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1 });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
