import { useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';
import ErrorNotification from './components/ErrorNotification';
// import SuccessNotification from './components/SuccessNotification';
import Togglling from './components/Togglling.js';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import { useSelector, useDispatch } from 'react-redux';
import { setBlogs } from './reducers/blogReducer';
import { setMessage } from './reducers/notificationReducer';
import { setUsername } from './reducers/usernameReducer';
import { setPassword } from './reducers/passwordReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.users);
  const message = useSelector((state) => state.notifications);
  const username = useSelector((state) => state.usernames);
  const password = useSelector((state) => state.passwords);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      dispatch(setBlogs(blogs.concat(returnedBlog)));
      console.log(returnedBlog);
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        'loggedBloglistappUser',
        JSON.stringify(user)
      );
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setUsername(''));
      dispatch(setPassword(''));
    } catch (exception) {
      dispatch(setMessage('Wrong username or password'));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBloglistappUser');
    console.log(`${user.name} logged out`);
    dispatch(setUser(null));
  };

  const handleLikeClick = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };

    try {
      const returnedBlog = await blogService.update(id, changedBlog);
      dispatch(
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
      );
    } catch (exception) {
      dispatch(
        setMessage(`Blog '${blog.title}' was already removed from the server`)
      );
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
    }
  };

  const handleDelete = async (title, author, id) => {
    if (window.confirm(`Delete ${title} by ${author}?`)) {
      await blogService.deleteBlog(id);
      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={message} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => dispatch(setUsername(target.value))}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => dispatch(setPassword(target.value))}
            />
          </div>
          <button id='login-button' type='submit'>
            login
          </button>
        </form>
      </div>
    );
  }

  const blogForm = () => (
    <Togglling buttonLabel='new blog'>
      <BlogForm createblog={addBlog} />
    </Togglling>
  );

  return (
    <div>
      <h2>blogs</h2>

      {/* <SuccessNotification message={successMessage} /> */}
      {/* <p>{user.name} logged in</p> */}
      <div>
        <p>{user.name} logged in</p>
        {blogForm()}
      </div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id.toString()}
          blog={blog}
          handleClick={() => handleLikeClick(blog.id)}
          handleDelete={() => handleDelete(blog.title, blog.author, blog.id)}
        />
      ))}
      <button type='submit' onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default App;
