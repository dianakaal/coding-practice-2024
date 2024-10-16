# This project is a practice app created with the help of the tutorials

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

# List of improvements for the future

- Possibility to deploy to Google Cloud. The app was deployed, however saving the configuration files into Git is questionable therefore none of them are saved. Some of them should be saved for future reference.
- Allow new users to save their names when creating an account.
- When user posts a comment include their name with the post.
- The data from article-content.js should be stored in the database instead of a file. Preferable with Mongoose.
- Upvoting on an article shows that you already upvoted, then you did not.
- Add a "logged out" page
- Ensure that the token being sent from the frontend is still valid.
- 


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

# Developing locally

Keep the proxy in package.json of Frontend to handle API requests while developing locally.

Run below commands in appropriate folders:
- Start up the Frontend on localhost:3000 `npm start` from frontend folder.
- Start up the local Mongo database `npm run mongo` from backend folder.
- Start up the Backend on localhost:8000 `npm run dev` from backend folder.


Access your app via localhost:3000/ to develop and test the frontend.

Your API requests from the React app will be proxied to the backend on localhost:8000 as needed.

Watch the terminal for errors and the browser's inspector for erros.






