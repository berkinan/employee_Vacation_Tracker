/*
  Developer: Berk İnan
  Project: Employee Vacation Tracker Website
  Position: Intern
  Github: https://github.com/berkinan/employee_Vacation_Tracker (Currently Private)
  Version: 0.4
  License: MIT
  ***This project is proprietary software and is bound by the terms and conditions of Kafein Technology Solutions.***

  For more information please visit the Github Page.
*/

import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import ListPage from './EmployeeList';
import EditPage from './EmployeeEdit';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import LoginPage from './loginPage';

const AppRouter = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, []);

  return (
    <Router>
      <TopBar />
      <div className="content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/" element={<RegisterPage />} />
        </Routes>
        <div ref={bottomRef}></div>
      </div>
      {isAtBottom && <BottomBar className="footer" />}
    </Router>
  );
};

export default AppRouter;
