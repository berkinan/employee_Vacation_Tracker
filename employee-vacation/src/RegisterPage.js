import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import WelcomeTutorial from './WelcomeTutorial';
import Cookies from 'js-cookie';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #fafafa;
  height: 400px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorText = styled.p`
  color: red;
`;

const handleSuccess = (res) => {
  console.log(res);
};

const handleFailure = (err) => {
 
  console.log(err);
};

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isTutorialVisible, setTutorialVisible] = useState(true);
  const [existingUserId, setExistingUserId] = useState(null);

  useEffect(() => {
    const tutorialShown = Cookies.get('tutorialShown');
    if (!tutorialShown) {
      setTutorialVisible(true);
      Cookies.set('tutorialShown', 'true', { expires: 365 });
    }
  }, []);

  const closeTutorial = () => {
    setTutorialVisible(false);
    Cookies.set('tutorialShown', 'true', { expires: 365 });
  };

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        name,
        surname,
        email,
      });

      if (response.data.alreadyRegistered) {
        setExistingUserId(response.data.id);
        setError('This email is already registered.');
        return;
      }

      window.location.href = `/list`;
    } catch (err) {
      setError('An error occurred while registering. Please try again.');
    }
  };

  const editExistingUser = () => {
    window.location.href = `/edit/${existingUserId}`;
  }

  return (
    <Container>
      <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter employee's name" />
      <Input type="text" value={surname} onChange={e => setSurname(e.target.value)} placeholder="Enter employee's surname" />
      <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter employee's email" />
      <Button onClick={register}>Register</Button>
      {error && <ErrorText>{error}</ErrorText>}
      {error && (
        <div>
          <Button onClick={editExistingUser}>Edit Existing User</Button>
          <Button onClick={() => setError(null)}>Register New User</Button>
        </div>
      )}
      {isTutorialVisible && <WelcomeTutorial onClose={closeTutorial} />} {}
    </Container>
  );
};

export default RegisterPage;
