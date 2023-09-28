import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { Button } from 'react-bootstrap';

const Home = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const totalBlogs = blogs.reduce((acc, curr) => {
    if (curr) {
      return acc + 1;
    }
  }, 0);

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBloglistappUser');
    console.log(`${user.name} logged out`);
    dispatch(setUser(null));
  };
  return (
    <div>
      <h2 className='header'>Home</h2>
      {/* <Alert variant='secondary'>
        <p>{user.name} logged in</p>
      </Alert> */}
      <p>
        Welcome to the blog app, a place where you can store and keep tabs on
        your favourite blog posts and enjoy other educative information from
        blogs saved by other users.
      </p>
      <p>There are currently {totalBlogs} blogs stored on the app.</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
        voluptatem enim qui nobis nesciunt nisi delectus officiis, dolores
        fugiat dolor voluptates quidem fugit dolorem omnis voluptatum saepe
        sequi maxime inventore, hic nostrum ex aspernatur, vero ipsum!
        Praesentium quod repellat numquam quas reiciendis, explicabo ad veniam
        autem. Officia voluptas minima iure unde culpa beatae dolorem expedita
        libero tempore est eius temporibus fugit illum vero nostrum
        consequuntur, repellendus harum laborum numquam similique eveniet,
        cupiditate non porro ab. Qui consectetur nam nemo fugiat pariatur
        accusamus veritatis fuga distinctio nulla dolor nesciunt molestias animi
        deserunt delectus aperiam enim, quo quisquam libero dignissimos
        assumenda non tenetur dicta laborum eos? Laboriosam veniam saepe aliquam
        sint, est rerum minus maxime deleniti mollitia nisi natus perferendis ad
        sit tenetur, perspiciatis a sed earum cum rem, placeat repudiandae.
        Maxime laboriosam sint esse quaerat adipisci sunt labore in ab
        temporibus repudiandae vel quas veniam nihil, ex, minus hic quidem.
        Deleniti.
      </p>
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
export default Home;
