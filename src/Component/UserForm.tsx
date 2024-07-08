import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const UserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !phone || !email) {
      setError('Please fill out all fields');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid Gmail address');
      return;
    }

    localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
    navigate('/second');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && (
          <Box mt={2} mb={2}>
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          </Box>
        )}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;
