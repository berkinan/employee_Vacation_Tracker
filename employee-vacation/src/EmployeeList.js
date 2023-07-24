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
  margin-bottom: 5px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const EraseButton = styled.button`
  padding : 10px 20px;
  margin-bottom: 5px;
  display: flex;
  margin-left: auto;
  border: none;
  border-radius: 5px;
  background-color: #DF8A0E;
  color: white;
  cursor: pointer;

  &:hover{
    background-color: #955D0A
  }
`;

const ButtonDelete = styled.button`
  padding: 10px 20px;
  margin-bottom: 5px;
  border: none;
  border-radius: 5px;
  background-color: #F01818;
  color: white;
  cursor: pointer;
  align-items = center;
  margin: 20px;

  &:hover {
    background-color: #B91616;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
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
        setEmployees([]); 
      } catch (err) {
        console.error('An error occurred while resetting the data.');
      }
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:3000/employees/${id}`);
        setEmployees(employees.filter((employee) => employee.id !== id));
      } catch (err) {
        console.error('An error occurred while deleting the employee.');
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
      <EraseButton onClick={resetData}>Erase All Data</EraseButton>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Surname</Th>
            <Th>Email</Th>
            <Th>Days Used</Th>
            <Th>Days Left</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter((employee) =>
              `${employee.name} ${employee.surname}`
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((employee) => (
              <tr key={employee.id}>
                <Td>{employee.name}</Td>
                <Td>{employee.surname}</Td>
                <Td>{employee.email}</Td>
                <Td>{employee.days_used}</Td>
                <Td>{employee.days_left}</Td>
                <Td>
                  <Button onClick={() => window.location.href = `/edit/${employee.id}`}>Edit</Button>
                  <ButtonDelete onClick={() => deleteEmployee(employee.id)}>Delete</ButtonDelete>
                </Td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeeList;
