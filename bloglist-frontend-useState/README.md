# Bloglist-frontend-useState

This folder implements the front end of the bloglist app that is used to store various blogs, their authors and urls. A like functionality is also implemented so users can like their favorite blogs. The blogs displayed are arranged in descending order of likes each blog has. Creation a of blogs is allowed only to logged in existing users with a valid token ehich is assingned on logging in to the app. State management is done with useStae and useEffect

# components

The components folder contains components used in the app split into their individual files: BlogForm.js to create new blogs, Blog.js to display the forms, Toggling.js to handle toggling functionality to view and hide blog information, Error and SuceessNotification to display various notifications

# services

The folder contains blogs.js file to handle requests made to server to create, update and delete blogs and login.js to handle post request for logging in to the app

app.js is used to implement functionality of the app by importing and using various components defined in other files and index.js renders the app.
