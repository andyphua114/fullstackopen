const mongoose = require('mongoose');
const supertest = require('supertest');

const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

//Ex 4.8
test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

//Ex 4.9
test('verify unique identifier is named id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

//Ex 4.10
test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/en/part4/testing_the_backend'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDB();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).toContain('async/await simplifies making async calls');
});

//Ex 4.11
test('valid blog without likes will default to 0', async () => {
  const newBlog = {
    title: 'this blog has no likes',
    author: 'Christoph Nakazawa',
    url: 'https://jestjs.io/'
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toEqual(0);
});

//Ex 4.12
describe('missing', () => {
  test('missing title', async () => {
    const newBlog = {
      author: 'Matti Luukkainen',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend'
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('missing url', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend'
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
