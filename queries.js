require('dotenv').config();
const { Pool } = require('pg');

// connect to the DB using environment variables
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// GET all users
const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

//Create a new user
// CREATE new user
const createUser = (req, res) => {
    const { name, email } = req.body;
  
    pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2)',
      [name, email],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send(`User added: ${name}`);
      }
    );
  };
  

module.exports = {
  getUsers,
  createUser,
};
