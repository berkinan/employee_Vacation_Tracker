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
