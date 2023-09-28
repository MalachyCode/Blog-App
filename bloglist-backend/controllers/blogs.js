const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization');
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '');
//   }
//   return null;
// };

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = request.user;
  // const user = await User.findById(decodedToken.id);

  if (body.title === undefined) {
    return response.status(400).json({ error: 'title missing' });
  }
  if (body.url === undefined) {
    return response.status(400).json({ error: 'url missing' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
    comments: [],
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body;
  const comment = body.comment;
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    blog.comments.push(comment);
    const savedBlog = await blog.save();
    const blogComment = savedBlog.comments;

    response.status(201).send(savedBlog.comments[blogComment.length - 1]);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = request.user;
  console.log(blog.user.toString());
  console.log(user.id.toString());
  // const user = await User.findById(decodedToken.id);
  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: `${user.username} cannot delete this blog` });
  }
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = request.user;

  const blog = {
    user: user.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(201).json(updatedBlog);
});

module.exports = blogsRouter;
