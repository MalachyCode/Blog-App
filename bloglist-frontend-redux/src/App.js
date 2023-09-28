import { useEffect } from 'react';
import blogService from './services/blogs';
import userService from './services/users';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { setBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { setUsers } from './reducers/usersReducer';
import { setMessage } from './reducers/notificationReducer';
import {
  Routes,
  Route,
  Link,
  useMatch,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Users from './pages/Users';
import Login from './pages/Login';
import UserInfo from './pages/UserInfo';
import BlogInfo from './pages/BlogInfo';
import { Container, Navbar, Nav } from 'react-bootstrap';

const App = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  const matchBlog = useMatch('/blogs/:id');
  const blogToShow = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  const matchUser = useMatch('/users/:id');
  const userToShow = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      );
  }, []);

  useEffect(() => {
    userService.getAll().then((users) => dispatch(setUsers(users)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      navigate('/');
    }
  }, []);

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
      navigate('/blogs');
    }
  };

  if (user === null) {
    <Navigate replace to='/login' />;
  }

  const padding = {
    padding: 5,
  };

  return (
    <div className='container'>
      <Navbar collapseOnSelect expand='lg' bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='#'>Blog App</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#' as='span'>
                <Link style={padding} to={'/'}>
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Link style={padding} to={'/blogs'}>
                  Blogs
                </Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Link style={padding} to={'users'}>
                  Users
                </Link>
              </Nav.Link>
            </Nav>
            <Navbar.Text>Signed in as: {user ? user.name : ''}</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/users/:id' element={<UserInfo user={userToShow} />} />
        <Route
          path='/blogs/:id'
          element={
            <BlogInfo
              blog={blogToShow}
              handleClick={() => handleLikeClick(blogToShow.id)}
              handleDelete={() =>
                handleDelete(blogToShow.title, blogToShow.author, blogToShow.id)
              }
            />
          }
        />
        <Route
          path='/blogs'
          element={user ? <Blogs /> : <Navigate replace to='/login' />}
        />
        <Route
          path='users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={user ? <Home /> : <Navigate replace to='/login' />}
        />
      </Routes>
    </div>
  );
};

export default App;
