# This is the backend of the app

## Install dependencies

Go to the folder of this project called `backend`

Then run `npm i`

## To run the backend locally

Go to the folder of this project called `backend/src`

Run `node server.js`

Localhost will be listening on port 8000

## To run the backend automatically during development

Go to the folder of this project called `backend`

Run `npm run dev`

Localhost will be listening on port 8000

Running above command will allow you to make code changes to the backend and they will come into effect immediately.

## To run MongoDB locally

Create a folder called `database-data` inside the backend folder

This is where Mongo will save files necessary for running it.

This folder will be gitignored.

### using the original command

Go to the folder of this project called `backend`

Run `mongod --dbpath ./database-data/`

### using custom command

Go to the folder of this project called `backend`

Run `npm run mongo`