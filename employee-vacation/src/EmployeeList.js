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
  align-items: center;
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

// ... (imports)

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
`;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [sortDirection, setSortDirection] = useState('asc');

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employees');
      
      const sortedEmployees = response.data.map((employee) => ({
        ...employee,
        department: employee.department || 'Unknown Department',
      })).sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        
        if (sortDirection === 'asc') {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        } else {
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
        }

        return 0;
      });

      setEmployees(sortedEmployees);
    } catch (err) {
      console.error('An error occurred while fetching the employees.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [sortDirection]);

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

  const resetEmployeeData = async (id) => {
    if (window.confirm("Are you sure you want to reset this employee's data?")) {
      try {
        await axios.put(`http://localhost:3000/reset/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error("An error occurred while resetting the employee's data.");
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
      <h4>Search for Employee</h4>
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <Select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
        <option value="">All Departments</option>
        <option value="HR">Human Resources</option>
        <option value="IT">Information Technology</option>
        {/* Add more departments here */}
      </Select>
      <EraseButton onClick={resetData}>Erase All Data</EraseButton>

      <Table>
        <thead>
          <tr>
            <Th onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>Name {sortDirection === 'asc' ? '↑' : '↓'}</Th>
            <Th>Surname</Th>
            <Th>Email</Th>
            <Th>Department</Th>
            <Th>Days Used</Th>
            <Th>Days Left</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter((employee) =>
              `${employee.name} ${employee.surname} ${employee.email}`
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .filter((employee) =>
              filterDepartment ? employee.department === filterDepartment : true
            )
            .map((employee) => (
              <tr key={employee.id}>
                <Td>{employee.name}</Td>
                <Td>{employee.surname}</Td>
                <Td>{employee.email}</Td>
                <Td>{employee.department}</Td>
                <Td>{employee.days_used}</Td>
                <Td>{employee.days_left}</Td>
                <Td>
                  <Button onClick={() => window.location.href = `/edit/${employee.id}`}>Edit</Button>
                  <ButtonDelete onClick={() => deleteEmployee(employee.id)}>Delete</ButtonDelete>
                  <Button onClick={() => resetEmployeeData(employee.id)}>Reset Days</Button>
                </Td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeeList;
