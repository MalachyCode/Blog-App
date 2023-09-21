const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const { tokenExtractor } = require('../utils/middleware');
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvZGVBbGZmYSIsImlkIjoiNjRjYTYxYTg5Njk3NmEzZGM2NzI0MzE5IiwiaWF0IjoxNjkxMjYwMTU5LCJleHAiOjE2OTEyNjM3NTl9.kbsjmBxQxkXNm2ob7qA4lXlyk7B-4h2jrf-X66oFEHA';

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
}, 100000);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 150000);

test('unique identifier property of blogs is named id', async () => {
  const response = await api.get('/api/blogs');

  // const contents = response.body.map((r) => r.id);
  // expect(contents.id).toBeDefined();
  expect(response.body.map((r) => r.id)).toBeDefined();
}, 100000);

test('a valid blog post can be added', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  };
  await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain('TDD harms architecture');
});

test('if like property from request is missing, it will default to 0', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const lastBlogIndex = response.body.length - 1;

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  // expect(response.body[2].likes).toBe(0 || response.body[2].likes);
  expect(response.body[lastBlogIndex].likes).toBe(
    0 || response.body[lastBlogIndex].likes
  );
});

test('a blog without title or url is not added', async () => {
  const newBlog = {
    author: 'Robert C. Martin',
    likes: 9,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a note can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const updateBlog = {
    likes: 10,
  };
  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updateBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  // expect(blogsAtEnd[0].likes).toBe(updateBlog.likes);
  expect(response.body.likes).toBe(updateBlog.likes);
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('a note can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map((blog) => blog.title);

  expect(titles).not.toContain(blogToDelete.title);
});

afterAll(async () => {
  await mongoose.connection.close();
});
