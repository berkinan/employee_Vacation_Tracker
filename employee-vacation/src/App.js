import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import ListPage from './EmployeeList';
import EditPage from './EmployeeEdit';
import TopBar from './TopBar';

const AppRouter = () => {
  return (
    <Router>
      <TopBar /> {}
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
