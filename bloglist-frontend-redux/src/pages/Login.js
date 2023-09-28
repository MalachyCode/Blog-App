import loginService from '../services/login';
import blogService from '../services/blogs';
// import ErrorNotification from '../components/ErrorNotification';
import { setMessage } from '../reducers/notificationReducer';
import { setUsername } from '../reducers/usernameReducer';
import { setPassword } from '../reducers/passwordReducer';
import { setUser } from '../reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const message = useSelector((state) => state.notifications);
  const username = useSelector((state) => state.usernames);
  const password = useSelector((state) => state.passwords);

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        'loggedBloglistappUser',
        JSON.stringify(user)
      );
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setUsername(''));
      dispatch(setPassword(''));
      navigate('/');
    } catch (exception) {
      dispatch(setMessage('Wrong username or password'));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      {/* <ErrorNotification message={message} /> */}
      {message && <Alert variant='danger'>{message}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
          <Button
            variant='outline-success'
            size='sm'
            id='login-button'
            type='submit'
          >
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
