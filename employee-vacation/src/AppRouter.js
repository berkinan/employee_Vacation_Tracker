import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import EmployeeList from './EmployeeList';
import EmployeeEdit from './EmployeeEdit';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/edit" element={<EmployeeEdit />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;







