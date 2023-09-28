import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import { setBlogs } from './reducers/blogReducer';
// import blogService from './services/blogs';

import App from './App';

import store from './store';

// blogService.getAll().then((blogs) => store.dispatch(setBlogs(blogs)));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
