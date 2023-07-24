import React from 'react';
import styled from 'styled-components';

const TutorialContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TutorialContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #60DF1C;
  color: white;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #3F9710;
  }
`;

const WelcomeTutorial = ({ onClose }) => {
  return (
    <TutorialContainer>
      <TutorialContent>
        <h2>Welcome to the Tracker</h2>
        <p>Here's how you can get started:</p>
        <ol>
          <li>Add an Employee</li>
          <li>Check the List</li>
          <li>Edit the Vacation</li>
        </ol>
        <Button onClick={onClose}>Got it!</Button>
      </TutorialContent>
    </TutorialContainer>
  );
};

export default WelcomeTutorial;
