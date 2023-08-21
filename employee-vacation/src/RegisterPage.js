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

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: 0px;
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

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
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

  const validateInputs = () => {
    if (
      name.trim() === '' ||
      surname.trim() === '' ||
      email.trim() === '' ||
      !email.includes('@') ||
      department.trim() === ''
    ) {
      setError('Please fill in all fields and provide a valid email and department.');
      return false;
    }
    setError(null);
    return true;
  };

  const register = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      console.log('Registering:', name, surname, email, department); // Logging data before sending the request

      const response = await axios.post('http://localhost:3000/register', {
        name,
        surname,
        email,
        departmentId: department.split('-')[0], // Extracting department ID from the selected option
      });

      console.log('Response:', response.data); // Logging the response from the server

      if (response.data.alreadyRegistered) {
        setExistingUserId(response.data.id);
        setError('This email is already registered.');
        return;
      }

      window.location.href = `/list`;
    } catch (err) {
      setError('An error occurred while registering. Please try again.');
      console.error('Registration Error:', err); // Logging the error
    }
  };

  const editExistingUser = () => {
    window.location.href = `/edit/${existingUserId}`;
  };

  return (
    <Container>
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter employee's name" />
      <Input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Enter employee's surname" />
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter employee's email" />
      <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">Select department</option>
        <option value="1">Human Resources</option>
        <option value="2">Information Technology</option>
      </Select>
      <Button onClick={register}>Register</Button>
      {error && <ErrorText>{error}</ErrorText>}
      {error && (
        <div>
          <Button onClick={editExistingUser}>Edit Existing User</Button> &nbsp;&nbsp;&nbsp;
          <Button onClick={() => setError(null)}>Register New User</Button>
        </div>
      )}
      {isTutorialVisible && <WelcomeTutorial onClose={closeTutorial} />}
    </Container>
  );
};

export default RegisterPage;
