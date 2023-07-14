import React, { useState, useEffect } from 'react';
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



  
const EmployeeEdit = ({ match }) => {
  const [employee, setEmployee] = useState({id: 1, email: 'dummyEmail@example.com', daysUsed: 5, daysLeft: 15});
  const [days, setDays] = useState(0);
  const saveChanges = () => {
    window.location.href = `/list`;
  }
  return (
    <Container>
      <h1>{employee.email}</h1>
      <Input type="number" value={days} onChange={e => setDays(e.target.value)} />
      <Button onClick={saveChanges}>Save</Button>
    </Container>
  );
};

export default EmployeeEdit;
