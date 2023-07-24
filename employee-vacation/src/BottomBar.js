import React from 'react';
import styled from 'styled-components';

const BottomBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #FFFFFF;
  position: bottom;
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
        <a href="https://linkedin.com/company/kafein-software/" target="_blank" rel="noopener noreferrer">
          <img src="/linkedin.png" alt="Linkedin" />
        </a>
        <a href="https://instagram.com/kafeintechnology/" target="_blank" rel="noopener noreferrer">
          <img src="/instagram.png" alt="Instagram" />
        </a>
        <a href="https://twitter.com/KafeinC" target="_blank" rel="noopener noreferrer">
          <img src="/twitter.png" alt="Twitter" />
        </a>
      </IconContainer>
    </BottomBarContainer>
  );
};

export default BottomBar;
