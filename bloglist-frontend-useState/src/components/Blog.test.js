import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders blog title and author', () => {
  const blog = {
    title: 'Creating new blog',
    author: 'Malachy Nwafor',
    url: 'https://www.malachynwafor.blogspot.com/create',
    likes: 3,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.simple-note');
  expect(div).toHaveTextContent('Creating new blog' && 'Malachy Nwafor');
});

test('clicking the button reveals likes and url', async () => {
  const blog = {
    title: 'Creating new blog',
    author: 'Malachy Nwafor',
    url: 'https://www.malachynwafor.blogspot.com/create',
    likes: 3,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.simple-note');

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

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

  render(<Blog blog={blog} handleClick={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('like');
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
