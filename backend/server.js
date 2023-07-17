const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12061997Sciencewest.',
  database: 'vacationTracker',
  waitForConnections: true,
});

app.post('/register', async (req, res) => {
  const { name, surname, email } = req.body;
  const [rows] = await pool.query('SELECT * FROM employees WHERE email = ?', [email]);

  if (rows.length > 0) {
    return res.json({ alreadyRegistered: true, id: rows[0].id });
  }

  const result = await pool.query('INSERT INTO employees (name, surname, email, days_used, days_left) VALUES (?, ?, ?, 0, 20)', [name, surname, email]);
  res.json({ alreadyRegistered: false, id: result.insertId });
});

app.get('/employees', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM employees');
  res.json(rows);
});

app.get('/employees/:id', async (req, res) => {
  const id = req.params.id;
  const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
  if (rows.length > 0) {
    res.json(rows[0]);
  } else {
    res.status(404).send('Employee not found');
  }
});

app.put('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const days = req.body.days;
  await pool.query('UPDATE employees SET days_used = ?, days_left = 20 - ? WHERE id = ?', [days, days, id]);
  res.json({ success: true });
});

app.delete('/reset', async (req, res) => {
  await pool.query('DELETE FROM employees');
  res.json({ success: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
