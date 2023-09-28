import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserForm from './UserForm';
import userEvent from '@testing-library/user-event';

test('<UserForm /> updates parent state and calls onSubmit', async () => {
  const createUser = jest.fn();
  const user = userEvent.setup();

  render(<UserForm createuser={createUser} />);

  const inputName = screen.getByPlaceholderText('Your name');
  const inputUsername = screen.getByPlaceholderText('Your username');
  const inputPassword = screen.getByPlaceholderText('Your password');

  const sendButton = screen.getByText('save');

  await user.type(inputName, 'Ikechukwu Ogbodo');
  await user.type(inputUsername, 'IOS');
  await user.type(inputPassword, 'oracle');
  await user.click(sendButton);

  expect(createUser.mock.calls).toHaveLength(1);
  expect(createUser.mock.calls[0][0].name).toBe('Ikechukwu Ogbodo');
  expect(createUser.mock.calls[0][0].username).toBe('IOS');
  expect(createUser.mock.calls[0][0].password).toBe('oracle');
});
