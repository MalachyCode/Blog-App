// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../reducers/notificationReducer';
import { setNewTitle } from '../reducers/titleReducer';
import { setNewAuthor } from '../reducers/authorReducer';
import { setNewUrl } from '../reducers/urlReducer';

import SuccessNotification from './SuccessNotification';

const BlogForm = ({ createblog }) => {
  const message = useSelector((state) => state.notifications);
  const newTitle = useSelector((state) => state.titles);
  const newAuthor = useSelector((state) => state.authors);
  const newUrl = useSelector((state) => state.urls);
  const dispatch = useDispatch();

  // const [newTitle, setNewTitle] = useState('');
  // const [newAuthor, setNewAuthor] = useState('');
  // const [newUrl, setNewUrl] = useState('');
  // const [successMessage, setSuccessMessage] = useState(null);

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
      <SuccessNotification message={message} />

      <h2>create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='new-title'
            name='title'
            value={newTitle}
            onChange={(event) => dispatch(setNewTitle(event.target.value))}
            placeholder='Blog title'
          />
        </div>
        <div>
          author:
          <input
            id='new-author'
            name='author'
            value={newAuthor}
            onChange={(event) => dispatch(setNewAuthor(event.target.value))}
            placeholder='Blog author'
          />
        </div>
        <div>
          url:
          <input
            id='new-url'
            name='url'
            value={newUrl}
            onChange={(event) => dispatch(setNewUrl(event.target.value))}
            placeholder='Blog url'
          />
        </div>
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default BlogForm;
