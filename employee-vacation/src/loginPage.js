import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #fafafa;
  height: 400px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      if (response.data.success) {
        // Redirect to the employee register page
        window.location.href = '/register';
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } catch (err) {
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <Container>
      <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
      <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
      <Button onClick={handleLogin}>Log in</Button>
    </Container>
  );
};

export default LoginPage;
