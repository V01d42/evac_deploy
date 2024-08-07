import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import { userRepository } from '@/libs/repository/firebase'; // Adjusted import path

interface RegisterData {
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<RegisterData>({
    email: '',
    password: '',
  });

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = data;

    try {
      await userRepository.create({ email, password });
      setData({ email: '', password: '' });
      toast.success('Successfully registered');
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Email already exists') {
          toast.error('Email already exists. Please use a different email.');
        } else {
          console.log(error);
          toast.error('Registration failed');
        }
      } else {
        console.error('Unexpected error', error);
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <AppContainer>
      <StyledPaper>
        <form className='form' onSubmit={handleRegister}>
          <Typography variant={'h5'}>Register</Typography>
          <TextField 
            label="Email address" 
            variant="standard" 
            className="text" 
            value={data.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, email: e.target.value })}
          />
          <TextField 
            label="Password" 
            variant="standard" 
            className="text" 
            type="password"
            value={data.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, password: e.target.value })}
          />
          <center>
            <Button type="submit" className="signup btn">Register</Button>
          </center>
          <center>
            <Button variant="outlined" onClick={() => navigate('/login')}>Back to Sign In</Button>
          </center>
        </form>
      </StyledPaper>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 960px;
  height: 540px;
  .form {
    width: 60%;
    margin: 3rem;
    text-align: center;
  }
  .text {
    width: 100%;
    margin: 1rem 0;
  }
  .btn {
    width: 60%;
    color: white;
    text-align: center;
    margin: 1.5rem 0;
    background-color: #008080;
  }
`;

export default SignupPage;
