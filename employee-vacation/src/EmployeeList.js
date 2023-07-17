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

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
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
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/employees');
        setEmployees(response.data);
      } catch (err) {
        console.error('An error occurred while fetching the employees.');
      }
    };

    fetchEmployees();
  }, []);

  const resetData = async () => {
    if (window.confirm("Are you sure that you want to reset all data?")) {
      try {
        await axios.delete('http://localhost:3000/reset');
        setEmployees([]); // Clear the employees list on the client side
      } catch (err) {
        console.error('An error occurred while resetting the data.');
      }
    }
  };

  return (
    <Container>
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <Button onClick={resetData}>Reset Data</Button>
      {employees
        .filter((employee) =>
          `${employee.name} ${employee.surname}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map((employee) => (
          <Employee key={employee.id}>
            <EmployeeInfo>{employee.name}</EmployeeInfo>
            <EmployeeInfo>{employee.surname}</EmployeeInfo>
            <EmployeeInfo>{employee.email}</EmployeeInfo>
            <EmployeeInfo>Days used: {employee.days_used}</EmployeeInfo>
            <EmployeeInfo>Days left: {employee.days_left}</EmployeeInfo>
            <Button onClick={() => window.location.href = `/edit/${employee.id}`}>Edit</Button>
          </Employee>
        ))}
    </Container>
  );
};

export default EmployeeList;
