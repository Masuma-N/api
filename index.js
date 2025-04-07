const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');
console.log('typeof db.getUsers:', typeof db.getUsers);


console.log('DB object:', db); // ADD THIS LINE

const app = express();
const port = 3000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// actual API route
app.get('/users', db.getUsers);
app.post('/users', db.createUser);

 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

