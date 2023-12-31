const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vacationTracker',
  waitForConnections: true,
});

app.post('/register', async (req, res) => {
  const { name, surname, email, departmentId } = req.body; // Assuming you're sending departmentId in the request body
  const [rows] = await pool.query('SELECT * FROM employees WHERE email = ?', [email]);

  if (rows.length > 0) {
    return res.json({ alreadyRegistered: true, id: rows[0].id });
  }

  try {
    // Check if the department exists
    const [departmentRows] = await pool.query('SELECT * FROM departments WHERE id = ?', [departmentId]);
    if (departmentRows.length === 0) {
      return res.status(400).json({ error: 'Department not found' });
    }

    const result = await pool.query(
      'INSERT INTO employees (name, surname, email, department_id, days_used, days_left) VALUES (?, ?, ?, ?, 0, 20)',
      [name, surname, email, departmentId]
    );
    res.json({ alreadyRegistered: false, id: result.insertId });
  } catch (error) {
    console.error('An error occurred while registering.', error);
    res.status(500).json({ error: 'An error occurred while registering.' });
  }
});


app.get('/employees', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT employees.*, departments.name as department FROM employees LEFT JOIN departments ON employees.department_id = departments.id'
    );
    res.json(rows);
  } catch (error) {
    console.error('An error occurred while fetching the employees.', error);
    res.status(500).json({ error: 'An error occurred while fetching the employees.' });
  }
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
  await pool.query('UPDATE employees SET days_used = ?, days_left = days_left - ? WHERE id = ?', [days, days, id]);
  res.json({ success: true });
});

app.delete('/reset', async (req, res) => {
  await pool.query('DELETE FROM employees');
  res.json({ success: true });
});

app.put('/reset/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('UPDATE employees SET days_used = 0, days_left = 20 WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('An error occurred while resetting the employee\'s data.');
    res.status(500).json({ error: 'An error occurred while resetting the employee\'s data.' });
  }
});

app.delete('/employees/:id', async (req, res) => {
  const id = req.params.id;
  await pool.query('DELETE FROM employees WHERE id = ?', [id]);
  res.json({ success: true });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
