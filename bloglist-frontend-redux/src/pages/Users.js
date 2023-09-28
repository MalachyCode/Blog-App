import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { setUsers } from '../reducers/usersReducer';
import User from '../components/User';
import userService from '../services/users';
import Togglling from '../components/Togglling';
import UserForm from '../components/UserForm';
import { Button, Table } from 'react-bootstrap';

const Users = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBloglistappUser');
    console.log(`${user.name} logged out`);
    dispatch(setUser(null));
  };

  const addUser = (userObject) => {
    userService.create(userObject).then((returnedUser) => {
      dispatch(setUsers(users.concat(returnedUser)));
      console.log(returnedUser);
    });
  };

  const userForm = () => (
    <Togglling buttonLabel='new user'>
      <UserForm createuser={addUser} />
    </Togglling>
  );

  return (
    <div>
      <h2 className='header'>Users</h2>

      <div>
        {/* <Alert variant='secondary'>
          <p>{user.name} logged in</p>
        </Alert> */}
        {userForm()}
      </div>

      <Table striped>
        <thead>
          <tr>
            <th>{'user'}</th>
            <th>{'blogs created'}</th>
          </tr>
        </thead>
      </Table>

      <Table striped>
        <tbody>
          {users.map((user) => (
            <tr key={user.id.toString()}>
              <td>
                <User user={user} />
              </td>
              <td>
                {user.blogs.reduce((total, blog) => {
                  if (blog) {
                    return total + 1;
                  }
                }, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        variant='outline-secondary'
        size='sm'
        type='submit'
        onClick={handleLogout}
      >
        logout
      </Button>
    </div>
  );
};
export default Users;
