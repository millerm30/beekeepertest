const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3010;
const dotenv = require('dotenv');
dotenv.config();
const Pool = require('pg').Pool;
const path = require('path');

app.use(cors());
app.use(express.json());

const static_dir = path.join(__dirname, '/client/build');

app.use('/', express.static(static_dir));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/users", async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const newUser = await pool.query("INSERT INTO users (first_name, last_name) VALUES ($1, $2) RETURNING *", [first_name, last_name]);
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
    res.json("User was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});