import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  background-color: #4caf50;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const EmployeeEdit = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <Container><div>Maintenance...</div></Container>;
  }

  return (
    <Container>
      <h2>Edit Employee</h2>
      <Form>
        <label htmlFor="name">Name:</label>
        <Input type="text" id="name" value={employee.name} disabled />

        <label htmlFor="surname">Surname:</label>
        <Input type="text" id="surname" value={employee.surname} disabled />

        <label htmlFor="email">Email:</label>
        <Input
          type="email"
          id="email"
          value={employee.email}
          onChange={(e) =>
            setEmployee({ ...employee, email: e.target.value })
          }
        />

        <Button type="submit">Save</Button>
      </Form>
    </Container>
  );
};

export default EmployeeEdit;
