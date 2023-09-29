import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../reducers/usersReducer';
import User from '../components/User';
import userService from '../services/users';
import Togglling from '../components/Togglling';
import UserForm from '../components/UserForm';
import { Table } from 'react-bootstrap';
import SuccessNotification from '../components/SuccessNotification';

const Users = () => {
  const users = useSelector((state) => state.users);
  const message = useSelector((state) => state.notifications);

  const dispatch = useDispatch();

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

      <SuccessNotification message={message} />

      <div>
        {/* <Alert variant='secondary'>
          <p>{user.name} logged in</p>
        </Alert> */}
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

      <div className='new-userform'>{userForm()}</div>
    </div>
  );
};
export default Users;
