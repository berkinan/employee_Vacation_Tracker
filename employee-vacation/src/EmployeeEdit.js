import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    return <div>Maintenance...</div>;
  }

  

  return (
    <div>
      <h2>Edit Employee</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={employee.name} disabled />

        <label htmlFor="surname">Surname:</label>
        <input type="text" id="surname" value={employee.surname} disabled />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={employee.email}
          onChange={(e) =>
            setEmployee({ ...employee, email: e.target.value })
          }
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
