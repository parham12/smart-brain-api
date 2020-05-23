const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT;

const postgres = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123',
      database : 'smart-brain'
    }
});



const app = express();

// app.use(express.static("D:\Users\Parham\JS\Web\facerecognitionbrain\facerecognitionbrain\public"));
app.use(express.json());
app.use(cors());





app.get('/', (req, res) => { res.send(postgres.users) });

app.post('/signin', signin.handleSignin(postgres, bcrypt));
 
// depenecy injection.
app.post('/register', register.handleRegister(postgres, bcrypt))

app.get('/profile/:id', profile.handleProfileGet(postgres));

app.put('/image', image.imageHandler(postgres));
app.post('/imageurl', image.imageApiHandler());

// PORT=3000 node server.js
// Environmental variable
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

console.log(PORT)

