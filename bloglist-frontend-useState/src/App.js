import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';
import ErrorNotification from './components/ErrorNotification';
// import SuccessNotification from './components/SuccessNotification';
import Togglling from './components/Togglling.js';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const blogs = await blogService.getAll();
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    }
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
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
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBloglistappUser');
    console.log(`${user.name} logged out`);
    setUser(null);
  };

  const handleLikeClick = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };

    try {
      const returnedBlog = await blogService.update(id, changedBlog);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
    } catch (exception) {
      setErrorMessage(
        `Blog '${blog.title}' was already removed from the server`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const handleDelete = async (title, author, id) => {
    if (window.confirm(`Delete ${title} by ${author}?`)) {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={errorMessage} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
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
