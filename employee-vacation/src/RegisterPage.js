import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #fafafa;
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

const ErrorText = styled.p`
  color: red;
`;



const RegisterPage = () => {
  const [email, setEmail] = useState('berkinan@sabanciuniv.edu');
  const [error, setError] = useState(null);
  const register = () => {
    window.location.href = `/list`;
  };
  return (
    <Container>
      <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter employee's email" />
      <Button onClick={register}>Register</Button>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default RegisterPage;
