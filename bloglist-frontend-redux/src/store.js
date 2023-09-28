import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import usernameReducer from './reducers/usernameReducer';
import passwordReducer from './reducers/passwordReducer';
import userReducer from './reducers/userReducer';
import titleReducer from './reducers/titleReducer';
import urlReducer from './reducers/urlReducer';
import authorReducer from './reducers/authorReducer';
import usersReducer from './reducers/usersReducer';
import nameReducer from './reducers/nameReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notifications: notificationReducer,
    passwords: passwordReducer,
    usernames: usernameReducer,
    authors: authorReducer,
    titles: titleReducer,
    urls: urlReducer,
    users: usersReducer,
    name: nameReducer,
  },
});

export default store;
