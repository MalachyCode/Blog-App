import { Link } from 'react-router-dom';

const User = ({ user }) => {
  return (
    <div className='user'>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </div>
  );
};

export default User;
