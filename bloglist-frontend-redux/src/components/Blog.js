import { useState } from 'react';
import '../index.css';

const ToggleBlogs = ({ blog, handleClick, handleDelete }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle} className='simple-note'>
      <div style={hideWhenVisible} className='title'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='full-note'>
        <div>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className='likes'>
          likes {blog.likes}
          <button onClick={handleClick}>like</button>
        </div>
        <div>{blog.author}</div>
        <button className='delete-btn' onClick={handleDelete}>
          delete
        </button>
      </div>
    </div>
  );
};

export default ToggleBlogs;
