import { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import { Button, Form } from 'react-bootstrap';

const CommentDisplay = ({ comment }) => <li>{comment}</li>;

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
    setValue,
  };
};

const BlogInfo = ({ blog, handleClick, handleDelete }) => {
  const [comments, setComments] = useState([]);
  const comment = useField('text');
  if (!blog) {
    return null;
  }

  useEffect(() => {
    setComments(comments.concat(blog.comments));
  }, []);

  const addComment = (event) => {
    event.preventDefault();
    // setComments(comments.concat(comment.value));

    blogService
      .comment(blog.id.toString(), comment.value)
      .then((comment) => setComments(comments.concat(comment)));
    comment.setValue('');
  };

  const commentId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  return (
    <div>
      <h2 className='header'>Blogs</h2>

      <div className='full-note'>
        <h2>{blog.title}</h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className='likes'>
          likes {blog.likes}
          <Button
            size='sm'
            variant='outline-success'
            className='like-btn'
            onClick={handleClick}
          >
            like
          </Button>
        </div>
        <div>
          added by <strong>{blog.author}</strong>
        </div>
        <h3>comments</h3>

        <Form onSubmit={addComment}>
          <Form.Group>
            <Form.Control
              type={comment.type}
              value={comment.value}
              onChange={comment.onChange}
              size='sm'
              placeholder='new comment'
            />
            <Button
              size='sm'
              variant='outline-success'
              className='comment-btn'
              type='submit'
            >
              add comment
            </Button>
          </Form.Group>
        </Form>
        <div>
          <ul className='comments'>
            {comments.map((comment) => (
              <CommentDisplay key={commentId()} comment={comment} />
            ))}
          </ul>
        </div>
        <Button
          className='delete-btn'
          size='sm'
          variant='outline-danger'
          onClick={handleDelete}
        >
          delete blog
        </Button>
      </div>
    </div>
  );
};

export default BlogInfo;
