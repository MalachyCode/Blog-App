import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogInfo from './BlogInfo';

test('renders full blog details', async () => {
  const blog = {
    title: 'Creating new blog',
    author: 'Malachy Nwafor',
    url: 'https://www.malachynwafor.blogspot.com/create',
    likes: 3,
  };

  const { container } = render(<BlogInfo blog={blog} />);

  const div = container.querySelector('.full-note');

  expect(div).toHaveTextContent(
    'https://www.malachynwafor.blogspot.com/create'
  );
  expect(div).toHaveTextContent('likes ');
});

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Creating new blog',
    author: 'Malachy Nwafor',
    url: 'https://www.malachynwafor.blogspot.com/create',
    likes: 3,
  };

  const mockHandler = jest.fn();

  render(<BlogInfo blog={blog} handleClick={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('like');
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
