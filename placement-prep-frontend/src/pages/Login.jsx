import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import authService from '../services/authService';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../pages/Login.css'; // Import the CSS file

const Login = () => {
  const navigate = useNavigate(); // Add navigation hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({ email, password });
      dispatch(login(response));
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.error || error.message);
      alert(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container"> {/* Apply the container class */}
        <div className="login-form"> {/* Apply the form class */}
          <form onSubmit={handleSubmit}>
            <h2>Login</h2> {/* Heading styling applied via CSS */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <div className="text-center mt-3">
              <a href="/signup" className="text-decoration-none">Don't have an account? Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;