# This project is a practice app created with the help of a course

You can find the original course in LinkedIn Learning.

The name of the course is "React: Creating and Hosting a Full-Stack Site".

It was found on this url: https://www.linkedin.com/learning/react-creating-and-hosting-a-full-stack-site-15153869

This project is not an absolute copy of the tutorial's teachings, but pretty close to it. It is just for practice after all.

A lot of debugging and fixing has been done during the course of this project. The commit messages will explain this in, hopefully, a clearer way.

A few things have changed in Firebase, React, and Node since the creation of the original tutorial so a few modification to the code and libraries had been done.

## This project's main features:

Frontend application using React 

Server with Node.js and Express

Persistence of data is with MongoDB

Authentication is done with Firebase

# Developing locally

Keep the proxy in package.json of Frontend to handle API requests while developing locally.

Run below commands in appropriate folders:
- Start up the Frontend on localhost:3000 `npm start` from frontend folder.
- Start up the local Mongo database `npm run mongo` from backend folder.
- Start up the Backend on localhost:8000 `npm run dev` from backend folder.


Access your app via localhost:3000/ to develop and test the frontend.

Your API requests from the React app will be proxied to the backend on localhost:8000 as needed.

Watch the terminal for errors or the browser's inspector for erros.

## Creating new users for the app so authentication can be tested

You would need to create an account in Firebase console (https://console.firebase.google.com/)

Create a web app project and copy the code provided to you into a file called `credentials.json` which will be in the directory called backend

From tab called Authentication, you will need to create users along with their passwords

These users should be able to sign into this app

Do not commit the credentials file to git!

# List of improvements for the future

- Possibility to deploy to Google Cloud. The app was deployed, however saving the configuration files into Git is questionable therefore none of them are saved.
  - placeholders should be saved for future development ease.
- Allow new users to save their names when creating an account.
  - Show these names when a user posts a comment on the article page.
- The data from article-content.js should be stored in the database instead of that file.
  - Preferably with Mongoose.
- Add a "logged out" page so the user gets redirected to it upon successful logout.
- Add expiration time to the authentication token.
  - This way user's session will become invalid after a certain time.
- Use React Context to store the token during the session and LocalStorage to persist it across page reloads.
- Allow a maximum of five comments by the same user.
- Remove unneccessary files
- Add Github workflows
  - Integrate your tests into a Continuous Integration/Continuous Deployment (CI/CD) pipeline to automatically run tests on every push or pull request.
  - Implement Continuous Deployment (CD) workflows to automatically deploy your application to production after successful test runs, streamlining the release process.
- Create tests, for example:
  - React components
    - Unit Tests: Use tools like Jest and React Testing Library to write unit tests for each component, ensuring they render correctly and respond to props.
    - Snapshot Tests: Capture the rendered output of components and ensure they don’t change unexpectedly over time.
  - Form validation
    - Write integration tests to verify that API calls are made correctly from components.
    - Mock API responses to test how components handle various scenarios (success, error, loading states).
  - API integration
    - Write integration tests to verify that API calls are made correctly from components.
    - Mock API responses to test how components handle various scenarios (success, error, loading states).
  - State management
    - If using context or a state management library (like Redux), test actions, reducers, and context providers to ensure state updates as expected.
  - Routing
    - Test that routing works correctly and the appropriate components render based on URL changes.
  - User interaction
    - Simulate user interactions (clicks, form submissions) and verify the expected outcomes (state changes, UI updates).
  - Accessibility
    - Use tools like Axe or react-axe to test your app for accessibility issues.
  - End to end testing
    - Implement end-to-end tests using Cypress or Selenium to simulate user journeys through your app.
  - Performance Tests:
    - Use tools like Lighthouse to test and measure performance metrics (e.g., load time, responsiveness) and ensure they meet your app's performance goals.
  - Security Tests:
    - Check for vulnerabilities like XSS, CSRF, and ensure that user input is sanitized and validated.
  - Cross-Browser Testing:
    - Ensure that your app functions correctly across different browsers and devices.
  - Deployment Checks:
    - Create tests that run after deployment to ensure that everything is functioning as expected in the production environment.

# Troubleshooting

## Local Mongo issues:

### Local Mongo aborts upon first run

Delete all the files inside backend/database-data directory. Do not delete the "database-data" folder.

Go in the terminal to the backend folder and run command `npm run mongo`.

If you had the backend server running and it is now displaying `[nodemon] app crashed - waiting for file changes before starting...` then stop it with CTRL+C and restart it with `npm run dev`

You should see the last output as `Example app listening on port 8000`

### Errors from axios saying article is not found

Your local mongo data might've been deleted.

In the local database should be the article names as well as upvotes and comments.

Reinsert the sample data like this:

From the terminal log into local mongo with command `mongosh`

You should get connected and you will see output like Current Mongosh Lig ID: ....

Type `use react-blog-db`

Type `db.articles.insertOne({articleId:"lizards",upvotes:0,comments:[]})`

Type `db.articles.insertOne({articleId:"rock-paper",upvotes:0,comments:[]})`

Type `db.articles.insertOne({articleId:"future-species",upvotes:0,comments:[]})`

Type `db.articles.updateMany(
  { upvoteIds: { $exists: false } }, // Find articles without upvoteIds
  { $set: { upvoteIds: [] } } // Set upvoteIds to an empty array
)`

You will know these commands were successful if you see output after each command that has "acknowledged: true" words in it.

Check all the data in the local database by typing `db.articles.find({}).pretty()`

Exit from local Mongo database with command `exit`

## Wondering about why there is need to proxy

### Why Proxying is Needed for Local Development

When the React app (running on http://localhost:3000/) makes a request to an API endpoint (e.g., /api/articles/lizards), it will be blocked by the browser due to CORS (Cross-Origin Resource Sharing) rules, because the frontend and backend are on different ports (3000 vs. 8000).

The proxy defined in package.json of Frontend allows you to bypass CORS issues by transparently forwarding these requests to the backend (http://localhost:8000/).

So for local development it's important to keep the proxy configuration.

### Why the App Still Opens on http://localhost:3000/

Your React app will always start on http://localhost:3000/ because that's the default port for the development server (npm start).

The proxy is working in the background to forward any API requests to http://localhost:8000/. You still need to access the app on http://localhost:3000/ to view the frontend and interact with it.

The proxy only affects API calls, not where your frontend is served.# This project is a practice app created with the help of the tutorials

You can find the tutorials in LinkedIn Learning.

The name of the course is "React: Creating and Hosting a Full-Stack Site"
It is found on this url: https://www.linkedin.com/learning/react-creating-and-hosting-a-full-stack-site-15153869

The code is found from https://github.com/LinkedInLearning/react-creating-and-hosting-a-full-stack-site-3209140/

This repo is not an absolute copy, but pretty close to the original. It is just for practice after all.

A lot of debugging and fixing has been done during the course of this project. The commit messages will explain this in, hopefully, a clearer way.

Be aware that a few things have changed in Firebase, React, and Node so a few updates to the code from the tutorials have been done.

## This project's main features:

Frontend application using React 

Server with Node.js and Express

Persistence of data is with MongoDB

Authentication is done with Firebase

# Developing locally

Keep the proxy in package.json of Frontend to handle API requests while developing locally.

Run below commands in appropriate folders:
- Start up the Frontend on localhost:3000 `npm start` from frontend folder.
- Start up the local Mongo database `npm run mongo` from backend folder.
- Start up the Backend on localhost:8000 `npm run dev` from backend folder.


Access your app via localhost:3000/ to develop and test the frontend.

Your API requests from the React app will be proxied to the backend on localhost:8000 as needed.

Watch the terminal for errors or the browser's inspector for erros.

## Creating new users for the app so authentication can be tested

You would need to create an account in Firebase console (https://console.firebase.google.com/)

Create a web app project and copy the code provided to you into a file called `credentials.json` which will be in the directory called backend

From tab called Authentication, you will need to create users along with their passwords

These users should be able to sign into this app

Do not commit the credentials file to git!

# List of improvements for the future

- Possibility to deploy to Google Cloud. The app was deployed, however saving the configuration files into Git is questionable therefore none of them are saved.
  - placeholders should be saved for future development ease.
- Allow new users to save their names when creating an account.
  - Show these names when a user posts a comment on the article page.
- The data from article-content.js should be stored in the database instead of that file.
  - Preferably with Mongoose.
- Add a "logged out" page so the user gets redirected to it upon successful logout.
- Add expiration time to the authentication token.
  - This way user's session will become invalid after a certain time.
- Use React Context to store the token during the session and LocalStorage to persist it across page reloads.
- Allow a maximum of five comments by the same user.

# Troubleshooting

## Local Mongo issues:

### Local Mongo aborts upon first run

Delete all the files inside backend/database-data directory. Do not delete the "database-data" folder.

Go in the terminal to the backend folder and run command `npm run mongo`.

If you had the backend server running and it is now displaying `[nodemon] app crashed - waiting for file changes before starting...` then stop it with CTRL+C and restart it with `npm run dev`

You should see the last output as `Example app listening on port 8000`

### Errors from axios saying article is not found

Your local mongo data might've been deleted.

In the local database should be the article names as well as upvotes and comments.

Reinsert the sample data like this:

From the terminal log into local mongo with command `mongosh`

You should get connected and you will see output like Current Mongosh Lig ID: ....

Type `use react-blog-db`

Type `db.articles.insertOne({articleId:"lizards",upvotes:0,comments:[]})`

Type `db.articles.insertOne({articleId:"rock-paper",upvotes:0,comments:[]})`

Type `db.articles.insertOne({articleId:"future-species",upvotes:0,comments:[]})`

Type `db.articles.updateMany(
  { upvoteIds: { $exists: false } }, // Find articles without upvoteIds
  { $set: { upvoteIds: [] } } // Set upvoteIds to an empty array
)`

You will know these commands were successful if you see output after each command that has "acknowledged: true" words in it.

Check all the data in the local database by typing `db.articles.find({}).pretty()`

Exit from local Mongo database with command `exit`

## Wondering about why there is need to proxy

### Why Proxying is Needed for Local Development

When the React app (running on http://localhost:3000/) makes a request to an API endpoint (e.g., /api/articles/lizards), it will be blocked by the browser due to CORS (Cross-Origin Resource Sharing) rules, because the frontend and backend are on different ports (3000 vs. 8000).

The proxy defined in package.json of Frontend allows you to bypass CORS issues by transparently forwarding these requests to the backend (http://localhost:8000/).

So for local development it's important to keep the proxy configuration.

### Why the App Still Opens on http://localhost:3000/

Your React app will always start on http://localhost:3000/ because that's the default port for the development server (npm start).

The proxy is working in the background to forward any API requests to http://localhost:8000/. You still need to access the app on http://localhost:3000/ to view the frontend and interact with it.

The proxy only affects API calls, not where your frontend is served.