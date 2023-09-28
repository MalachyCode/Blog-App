import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import User from './User';

test('renders user name and username', () => {
  const user = {
    id: 1,
    name: 'Ikechukwu Ogbodo',
    username: 'IOS',
  };

  const { container } = render(<User user={user} />);

  const div = container.querySelector('.user');
  expect(div).toHaveTextContent('Ikechukwu Ogbodo' && 'IOS');
});
