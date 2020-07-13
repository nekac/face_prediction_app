const express = require('express');
const bodyParser = require('body-parser'); // extract the entire body portion to be readable
const bcrypt = require('bcryptjs'); // for password management and saving hash value
const cors = require('cors'); // additional HTTP headers to give access to different origin resources then current one
const knex = require('knex'); // db tool with query functions
 
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({ // connect sever to specific database, SQL query builder
  client: 'pg',
  connection: {
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : 'test',
	  database : 'image_prediction'
	}
});

// server creation
const app = express(); // creating app/server by running express
app.use(bodyParser.json()); // middleware, used to parse response
app.use(cors()); // middleware

/*
 ENDPOINTS:
/ --> response = this is working
/signin --> POST = success/failed
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user(counter)
*/

app.get('/', (request, response) => {
	response.send(database.users);
});

// Check user credentials for sign in, checking in database
// bcrypt, hashing passwords and comparing passowrds when user is logging

app.post('/signin', (request, response) => {
	signin.signinUser(request, response, db, bcrypt); // dependency injection
}); 

// Register new user
app.post('/register', (request, response) => {
	register.registerUser(request, response, db, bcrypt)
});

// Collect users by the profile id value
app.get('/profile/:id', (request, response) => {
	profile.getUser(request, response, db)
});

// Submit new picture and counter is updated then
app.put('/image', (request, response) => {
	image.updateImageCount(request, response, db)
});

// Request from server to Clarifai API, get data from there
app.post('/imageurl', (request, response) => {
	image.apiCall(request, response)
});

// starting server
app.listen(3001, () => {
	console.log('App is running on port 3001');
});

