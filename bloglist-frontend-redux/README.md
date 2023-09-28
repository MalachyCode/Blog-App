# Bloglist-frontend-redux

This folder implements the front end of the bloglist app that is used to store various blogs, their authors and urls. A like functionality is also implemented so users can like their favorite blogs. The blogs displayed are arranged in descending order of likes each blog has. Creation a of blogs is allowed only to logged in existing users with a valid token ehich is assingned on logging in to the app. State management is done with react redux. Tetsing in the application is done using cypress.

# components

The components folder contains components used in the app split into their individual files: BlogForm.js to create new blogs, Blog.js to display each blog retrieved from the database and stored in the application's state, Toggling.js to handle toggling functionality to view and hide forms for adding new bogs and user with the click of a button, Error and SuceessNotification to display various notifications.

# services

The folder contains blogs.js file to handle requests made to server to create, like, delete and add comments to blogs and login.js to handle post request for logging in to the app.

# pages

Various components (pages) are defined in this folder. These pages are accessed or navigated to when their individual routes (specified using react router) are visited. They include: BlogInfo.js to show information about the clicked blog as each blog is displayed as a link, Blogs.js to show all blogs in the app, Home.js displays the home page, Login.js displays the login page when the user is not logged in, UserInfo.js to show information about the clicked user as each user is displayed as a link and Users.js to show all users in registered in the app.

app.js is used to implement functionality of the app such as implementing navigation links and navigation to various pages using react router's routes, route and link components. index.js renders the app.

Styling of forms, tables, navbar etc is done with CSS and the react bootstrap framework.
