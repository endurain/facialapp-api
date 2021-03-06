const express = require('express');
//express needs bodyParser to use app.use
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

knex({
  client: 'pg',
  connection: {
    host: '102.0.0.1',
    user: 'zac',
    password: '',
    database: 'facialapp'
  }
});

const app = express();


const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: '0',
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: '0',
      joined: new Date()
    }
  ]
}

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
})

app.post('/register', (req, res) => {
  const { email, name , password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: '0',
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (users.id === id) {
    found = true;
    return res.json(user);
    }
  })
  if (!found) {
    res.status(400).json('not found');
  }
})
//check image and rank user
app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
      if (user.id === id) {
        found = true;
        user.entries++
        return res.json(user.entries);
      }
    })
    if (!found) {
      res.status(400).json('not found')
  }
})

app.listen(3000, ()=> {
  console.log('running port 3000');
})






// root route that responds with = this is working
// signin route with POST and respond with success or fail
//register with POST which will be the new user Object
//profile route with an userID with GET and return a user
//also an image input thatcounts images and ranks with PUT
