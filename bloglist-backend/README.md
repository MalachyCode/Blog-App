# Bloglist-backend

This repository contains the backend for the blog-list application. Authentication is done with json web token. Everytime a user logs in, a new token is assigned to the user and without the token, the user cannot create, edit or delete a blog in the list. Below, I document brief information about the various folders and files in the repository:

# controllers

This folder contains router files that handle requests made to the server e.g. post request made to create new blogs on the server stored in blogs.js file, post request made to create new users for the application stored in the users.js, post request for existing user to log into the application stored in login.js file and get request to fetch all and individual blog resources from the server etc.

# models

The folder contains model files (template specification) for creating new users (user.js file) or new blogs (blog.js file).

# requests

Requests folder contain test request made to the server to create blogs done with the VS Code rest client.

# tests

Tests folder contains various test files used for testing implemented functionality in the application. For instance, blog_api.test.js is used to test blog creation, updating and fetching of blogs from the server, favouriteBlog.test.js is used to test and obtain blog with most likes, sumLikes.test.js tests addition of likes of each blog, mostBlogs.test.js tests that the author with most blogs is accurate, user_api.test.js used to test user creation.

# utils

Utils folder contains files like middleware.js for creating middlewares, logger.js for printing info and error about various processes in the app to the console and config.js that defines the port the application is run on and connects the app to MongoDB based on the mode the app is run in (test or dev mode).

Other files include: .env file for creating environment variables, index.js for starting up the server and app.js to connect all routers together, middleware to files they're needed in and connect the app to MongoDB database using mongoose.
