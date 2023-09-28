import Blog from '../components/Blog';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { setBlogs } from '../reducers/blogReducer';
import blogService from '../services/blogs';
import Togglling from '../components/Togglling';
import BlogForm from '../components/BlogForm';
import { Button, Table } from 'react-bootstrap';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBloglistappUser');
    console.log(`${user.name} logged out`);
    dispatch(setUser(null));
  };

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      dispatch(setBlogs(blogs.concat(returnedBlog)));
      console.log(returnedBlog);
    });
  };

  const blogForm = () => (
    <Togglling buttonLabel='new blog'>
      <BlogForm createblog={addBlog} />
    </Togglling>
  );

  return (
    <div>
      <h2 className='header'>Blogs</h2>

      <div>
        {/* <Alert variant='secondary'>
          <p>{user.name} logged in</p>
        </Alert> */}
        {blogForm()}
      </div>

      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id.toString()}>
              <td>
                <Blog key={blog.id.toString()} blog={blog} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        variant='outline-secondary'
        size='sm'
        type='submit'
        onClick={handleLogout}
      >
        logout
      </Button>
    </div>
  );
};
export default Blogs;
