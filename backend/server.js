const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12061997',
  database: 'vacation_tracker',
  waitForConnections: true,
});

app.post('/register', async (req, res) => {
  const email = req.body.email;
  const [rows] = await pool.query('SELECT * FROM employees WHERE email = ?', [email]);
  if (rows.length > 0) {
    return res.json({ alreadyRegistered: true, id: rows[0].id });
  }

  const result = await pool.query('INSERT INTO employees (email, days_used, days_left) VALUES (?, 0, 20)', [email]);
  res.json({ alreadyRegistered: false, id: result.insertId });
});

app.get('/employees', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM employees');
  res.json(rows);
});

app.put('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const days = req.body.days;
  await pool.query('UPDATE employees SET days_used = ?, days_left = 20 - ? WHERE id = ?', [days, days, id]);
  res.json({ success: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
