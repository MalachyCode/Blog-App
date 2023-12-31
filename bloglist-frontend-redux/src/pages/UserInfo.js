const DisplayBlog = ({ blog }) => <li>{blog.title}</li>;

const UserInfo = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      {/* <h2 className='header'>Users</h2> */}

      <div className='full-user'>
        <h2 className='user-name'>{user.name}</h2>
        <h4 className='user-name'>username: {user.username}</h4>
        <h5>Blogs added by this user: </h5>

        <div>
          <ul className='user-blogs'>
            {user.blogs.map((blog) => (
              <DisplayBlog key={blog.id.toString()} blog={blog} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
