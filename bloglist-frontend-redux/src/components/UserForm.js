import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../reducers/notificationReducer';
import { setUsers } from '../reducers/usersReducer';
import userService from '../services/users';
import { setUsername } from '../reducers/usernameReducer';
import { setPassword } from '../reducers/passwordReducer';
import { setName } from '../reducers/nameReducer';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const navigate = useNavigate();

  const message = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.user);
  const name = useSelector((state) => state.name);
  const users = useSelector((state) => state.users);
  const username = useSelector((state) => state.usernames);
  const password = useSelector((state) => state.passwords);
  const dispatch = useDispatch();

  const addUser = (event) => {
    event.preventDefault();
    const userObject = {
      name: name,
      username: username,
      password: password,
    };

    userService.create(userObject).then((returnedUser) => {
      dispatch(setUsers(users.concat(returnedUser)));
      console.log(returnedUser);
    });

    dispatch(
      setMessage(`a new user ${name} with username ${username} created`)
    );
    setTimeout(() => {
      dispatch(setMessage(null));
      navigate('/login');
    }, 3000);
    dispatch(setName(''));
    dispatch(setUsername(''));
    dispatch(setPassword(''));
  };

  const cancel = () => {
    navigate('/users');
  };

  return (
    <div>
      <h2>create a new user</h2>

      {message && <Alert variant='success'>{message}</Alert>}

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
          <Button
            variant='success'
            className='save-button'
            size='sm'
            type='submit'
          >
            save
          </Button>
        </Form.Group>
      </Form>
      {user && (
        <Button
          variant='outline-dark'
          className='save-button'
          size='sm'
          type='submit'
          onClick={cancel}
        >
          cancel
        </Button>
      )}
    </div>
  );
};

export default UserForm;
