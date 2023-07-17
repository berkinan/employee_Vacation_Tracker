import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

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

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({id: null, name: '', surname: '', email: '', daysUsed: 0, daysLeft: 0});
  const [days, setDays] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await axios.get(`http://localhost:3000/employees/${id}`);
      setEmployee(response.data);
      setDays(response.data.days_used);
      setIsLoading(false);
    };

    fetchEmployee();
  }, [id]);

  const saveChanges = async () => {
    await axios.put(`http://localhost:3000/edit/${id}`, { days });
    navigate('/list');
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div>No employee data found</div>;
  }

  return (
    <Container>
      <h1>{employee.name} {employee.surname}</h1>
      <Input type="number" value={days} onChange={e => setDays(e.target.value)} />
      <Button onClick={saveChanges}>Save</Button>
    </Container>
  );
};

export default EmployeeEdit;
