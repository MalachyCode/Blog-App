import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createblog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText('Blog title');
  const inputAuthor = screen.getByPlaceholderText('Blog author');
  const inputUrl = screen.getByPlaceholderText('Blog url');

  const sendButton = screen.getByText('save');

  await user.type(inputTitle, 'testing a form...');
  await user.type(inputAuthor, 'Malachy Nwafor');
  await user.type(inputUrl, 'https://www.malachynwafor.blogspot.com/test');
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...');
  expect(createBlog.mock.calls[0][0].author).toBe('Malachy Nwafor');
  expect(createBlog.mock.calls[0][0].url).toBe(
    'https://www.malachynwafor.blogspot.com/test'
  );
});
