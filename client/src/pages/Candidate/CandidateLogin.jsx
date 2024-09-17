// CandidateLogin.jsx
import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const CandidateLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/auth/candidate/login', { email, password });
      // Redirect to candidate dashboard
      navigate('/candidate/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <h2>Candidate Login</h2>                           
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <Button className="my-4" variant="primary" type="submit">Login</Button>
      </form>
    </div>
  );
};

export default CandidateLogin;
