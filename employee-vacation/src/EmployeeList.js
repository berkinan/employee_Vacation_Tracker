import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #fafafa;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Employee = styled.div`
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const EmployeeInfo = styled.p`
  margin-bottom: 10px;
`;



const EmployeeList = () => {
  const [employees, setEmployees] = useState([{id: 1, email: 'berkinan@sabanciuniv.edu', daysUsed: 5, daysLeft: 15}, {id: 2, email: 'inan.berk.business@gmail.com', daysUsed: 0, daysLeft: 20}]);
  const resetData = () => {
    setEmployees([]);
  };
  const search = () => {};
  return (
    <Container>
      <Button onClick={resetData}>Reset Data</Button>
      <Button onClick={search}>Search</Button>
      {employees.map(employee => (
        <Employee key={employee.id}>
          <EmployeeInfo>{employee.email}</EmployeeInfo>
          <EmployeeInfo>Days used: {employee.daysUsed}</EmployeeInfo>
          <EmployeeInfo>Days left: {employee.daysLeft}</EmployeeInfo>
          <Button onClick={() => window.location.href = `/edit/${employee.id}`}>Edit</Button>
        </Employee>
      ))}
    </Container>
  );
};

export default EmployeeList;
