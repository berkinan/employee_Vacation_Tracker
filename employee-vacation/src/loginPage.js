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
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        name,
        surname,
        password,
      });

      if (response.data.success) {
        window.location.href = '/register';
      } else {
        alert('Invalid input, Please try again');
      }
    } catch (err) {
      alert('An error occurred while register process.');
    }
  };

  return (
    <Container>
      <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
      <Input type ="name" value={name} onChange= {e => setName(e.target.value)} placeholder ="Enter your name" />
      <Input type="surname" value={surname} onChange={e => setSurname(e.targer.value)} placeholder = "Enter your surname" />
      <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
      <Button onClick={handleLogin}>Register</Button>
    </Container>
  );
};

export default LoginPage;
