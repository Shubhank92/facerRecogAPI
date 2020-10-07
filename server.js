// Dependencies
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
// Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
        client: 'pg',
        connection: {
          host : '127.0.0.1',
          user : 'postgres',
          password : 'forfifa14',
          database : 'smartbrain'
        }
});


const app = express();

app.use(express.json());
app.use(cors());

// if any error take a look on the code below
app.get('/', (req, res) => {
    res.send(db.users)
})

app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db)
})

app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
    image.handleAPIcall(req, res)
})


app.listen(process.env.PORT || 3001, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})

// when making your API plan it out first

// "/" (root route) --> res = this is working

// "/signin" --> POST req because we're posting some data &
// it's gonna respond with success or fail

// "/register" --> POST req becoz we're gonna add the data &
// res with user

// "/profile":userId --> GET = user

// "/image" --> PUT --> updated score for user