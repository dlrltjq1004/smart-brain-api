const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const dotenv = require('dotenv');

const db = require('./module/db');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('it is working!');
});
app.post('/signin', signin.handleSignin(db.init(knex), bcrypt));
app.post('/register', register.handleRegister(db.init(knex), bcrypt));
app.get('/profile/:id', profile.handleProfile(db.init(knex)));
app.put('/image', image.handleImage(db.init(knex)));
app.post('/imageurl', image.handleApiCall());

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
