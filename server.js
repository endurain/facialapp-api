const express = require('express');
//express needs bodyParser to use app.use
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
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

app.get('/', (req, res)=> {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json('success');
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
    password: password,
    entries: '0',
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  database.users.forEach(users => {
    if (users.id === id) {
    return res.json(users);
      } else {
      res.status(404).json('no such user');
    }
  })
})

app.listen(3000, ()=> {
  // console.log('running port 3000');
})






// root route that responds with = this is working
// signin route with POST and respond with success or fail
//register with POST which will be the new user Object
//profile route with an userID with GET and return a user
//also an image input thatcounts images and ranks with PUT
