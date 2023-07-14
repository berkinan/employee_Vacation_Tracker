import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; // Import the CSS file here

const LoginPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/employees', {
        name,
        surname,
        email,
      });
      console.log(response.data);
      window.location.href = '/employees';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form className="login-form" onSubmit={handleRegister}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="surname">Surname:</label>
        <input
          type="text"
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Register Employee</button>
      </form>
      <div className="how-to">
        <h3>How To Use</h3>
        <p>Enter your name, surname, and email in the provided fields, then click the "Register Employee" button to create an account. Once registered, you will be redirected to the Employees page.</p>
      </div>
    </div>
  );
};

export default LoginPage;
