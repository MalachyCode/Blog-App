const DisplayBlog = ({ blog }) => <li>{blog.title}</li>;

const UserInfo = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2 className='header'>Users</h2>

      <h2>{user.name}</h2>
      <p>added blogs</p>
      <ul>
        {user.blogs.map((blog) => (
          <DisplayBlog key={blog.id.toString()} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;
