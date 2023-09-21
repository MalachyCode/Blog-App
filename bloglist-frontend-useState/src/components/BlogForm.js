import { useState } from 'react';
import SuccessNotification from './SuccessNotification';

const BlogForm = ({ createblog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  const addBlog = (event) => {
    event.preventDefault();
    createblog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setSuccessMessage(`a new blog ${newTitle} by ${newAuthor} added`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <div>
      <SuccessNotification message={successMessage} />

      <h2>create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='new-title'
            name='title'
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            placeholder='Blog title'
          />
        </div>
        <div>
          author:
          <input
            id='new-author'
            name='author'
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            placeholder='Blog author'
          />
        </div>
        <div>
          url:
          <input
            id='new-url'
            name='url'
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
            placeholder='Blog url'
          />
        </div>
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default BlogForm;
