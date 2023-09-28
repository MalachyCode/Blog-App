import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../reducers/notificationReducer';
import { setUsername } from '../reducers/usernameReducer';
import { setPassword } from '../reducers/passwordReducer';
import { setName } from '../reducers/nameReducer';
import SuccessNotification from './SuccessNotification';
import { Button, Form } from 'react-bootstrap';

const UserForm = ({ createuser }) => {
  const message = useSelector((state) => state.notifications);
  const name = useSelector((state) => state.name);
  const username = useSelector((state) => state.usernames);
  const password = useSelector((state) => state.passwords);
  const dispatch = useDispatch();

  const addUser = (event) => {
    event.preventDefault();
    createuser({
      name: name,
      username: username,
      password: password,
    });

    dispatch(
      setMessage(`a new user ${name} with username ${username} created`)
    );
    setTimeout(() => {
      dispatch(setMessage(null));
    }, 5000);
    dispatch(setName(''));
    dispatch(setUsername(''));
    dispatch(setPassword(''));
  };

  return (
    <div>
      <SuccessNotification message={message} />

      <h2>create a new user</h2>

      <Form onSubmit={addUser}>
        <Form.Group>
          <Form.Label>name:</Form.Label>
          <Form.Control
            id='new-name'
            name='name'
            value={name}
            onChange={(event) => dispatch(setName(event.target.value))}
            placeholder='Your name'
          />
          <Form.Label>username:</Form.Label>
          <Form.Control
            id='new-username'
            name='username'
            value={username}
            onChange={(event) => dispatch(setUsername(event.target.value))}
            placeholder='Your username'
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id='new-password'
            name='password'
            type='password'
            value={password}
            onChange={(event) => dispatch(setPassword(event.target.value))}
            placeholder='Your password'
          />
          <Button variant='success' size='sm' type='submit'>
            save
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default UserForm;
