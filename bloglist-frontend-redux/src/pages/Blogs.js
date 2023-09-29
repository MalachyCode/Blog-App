import Blog from '../components/Blog';
import { useSelector, useDispatch } from 'react-redux';
import { setBlogs } from '../reducers/blogReducer';
import blogService from '../services/blogs';
import Togglling from '../components/Togglling';
import BlogForm from '../components/BlogForm';
import { Alert, Table } from 'react-bootstrap';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const message = useSelector((state) => state.notifications);

  const dispatch = useDispatch();

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

      {message && <Alert variant='success'>{message}</Alert>}

      <div>
        {/* <Alert variant='secondary'>
          <p>{user.name} logged in</p>
        </Alert> */}
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

      <div className='new-blogform'>{blogForm()}</div>
    </div>
  );
};
export default Blogs;
