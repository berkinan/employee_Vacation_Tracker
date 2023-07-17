import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  position: relative;
`;

const Logo = styled.img`
  height: 60px;
  width: auto;
  transform: scale(1.3);
`;

const SiteName = styled.h2`
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-300px'};
  height: 100%;
  width: 200px;
  background-color: #fff;
  padding: 20px;
  box-shadow: -5px 0px 15px rgba(0,0,0,0.2);
  transition: right 0.5s ease-in-out;
  z-index: 10;
`;

const NavigationButton = styled.button`
  background-color: #fff;
  color: #333;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  border-radius: 5px;
  padding: 5px 10px;
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 11;
`;

const NavLink = styled(Link)`
  display: block;
  color: #333;
  text-decoration: none;
  padding: 10px 0;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 9;
`;

const TopBar = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  return (
    <>
      <TopBarContainer>
        <Link to = "/register" >
          <Logo src="/logo.jpg" alt="Company Logo"/>x
        </Link>
        <SiteName>Vacation Tracker</SiteName>
        <NavigationButton onClick={toggleNavigation}>☰</NavigationButton>
      </TopBarContainer>

      {isNavigationOpen && <Overlay onClick={toggleNavigation} />}
      
      <Navigation isOpen={isNavigationOpen}>
        <NavLink to="/register" onClick={toggleNavigation}>Register</NavLink>
        <NavLink to="/list" onClick={toggleNavigation}>Employee List</NavLink>
      </Navigation>
    </>
  );
};

export default TopBar;
