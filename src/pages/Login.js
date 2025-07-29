// src/pages/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const dummyUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    login(dummyUser);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>Login Page</h2>
      <p>This is a dummy login page. Click the button below to log in as John Doe.</p>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login as John Doe
      </button>
    </div>
  );
}

export default Login;
