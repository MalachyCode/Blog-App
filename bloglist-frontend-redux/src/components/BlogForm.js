import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../reducers/notificationReducer';
import { setNewTitle } from '../reducers/titleReducer';
import { setNewAuthor } from '../reducers/authorReducer';
import { setNewUrl } from '../reducers/urlReducer';
import { Alert, Button, Form } from 'react-bootstrap';

// import SuccessNotification from './SuccessNotification';

const BlogForm = ({ createblog }) => {
  const message = useSelector((state) => state.notifications);
  const newTitle = useSelector((state) => state.titles);
  const newAuthor = useSelector((state) => state.authors);
  const newUrl = useSelector((state) => state.urls);
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    createblog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    dispatch(setMessage(`a new blog ${newTitle} by ${newAuthor} added`));
    setTimeout(() => {
      dispatch(setMessage(null));
    }, 5000);
    dispatch(setNewTitle(''));
    dispatch(setNewAuthor(''));
    dispatch(setNewUrl(''));
  };

  return (
    <div>
      {message && <Alert variant='success'>{message}</Alert>}

      {/* <SuccessNotification message={message} /> */}

      <h2>create a new blog</h2>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id='new-title'
            name='title'
            value={newTitle}
            onChange={(event) => dispatch(setNewTitle(event.target.value))}
            placeholder='Blog title'
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id='new-author'
            name='author'
            value={newAuthor}
            onChange={(event) => dispatch(setNewAuthor(event.target.value))}
            placeholder='Blog author'
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id='new-url'
            name='url'
            value={newUrl}
            onChange={(event) => dispatch(setNewUrl(event.target.value))}
            placeholder='Blog url'
          />
          <Button variant='success' size='sm' type='submit'>
            save
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BlogForm;
