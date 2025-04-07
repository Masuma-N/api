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

//get user by id
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  };
  


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

  const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`User modified with ID: ${id}`);
      }
    );
  };
  
  

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser
};
