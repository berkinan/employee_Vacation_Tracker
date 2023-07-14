import React, { useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22);
  background-color: #ffffff;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &:hover {
    box-shadow: 0px 40px 58px -16px rgba(0,0,0,0.25), 0px 30px 22px -10px rgba(0,0,0,0.22);
  }
`;

const Input = styled.input`
  height: 40px;
  padding: 0 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: border 0.5s;
  &:focus {
    outline: none;
    border-color: #6c63ff;
  }
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 5px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Button = styled.button`
  height: 45px;
  margin-top: 10px;
  background-color: #6c63ff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #4834d4;
  }
`;

const HowTo = styled.div`
  width: 400px;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  animation: 2s ${fadeIn} ease-in;
`;

// Component
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
    <Container>
      <Form onSubmit={handleRegister}>
        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Label htmlFor="surname">Surname:</Label>
        <Input
          type="text"
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit">Register Employee</Button>
      </Form>
      <HowTo>
        <h3>How To Use</h3>
        <p>Enter your name, surname, and email in the provided fields, then click the "Register Employee" button to create an account. Once registered, you will be redirected to the Employees page.</p>
      </HowTo>
    </Container>
  );
};

export default LoginPage;
