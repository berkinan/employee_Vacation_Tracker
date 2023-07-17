import React from 'react';
import styled from 'styled-components';

const BottomBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #FFFFFF;
  position: bottom;
  bottom: 0;
  left: 0;
  right: 0;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
`;

const BottomBar = () => {
  return (
    <BottomBarContainer>
      <Logo src="/logo2.png" alt="Logo" />
      <IconContainer>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/facebook.png" alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/instagram.png" alt="Instagram" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="/twitter.png" alt="Twitter" />
        </a>
      </IconContainer>
    </BottomBarContainer>
  );
};

export default BottomBar;