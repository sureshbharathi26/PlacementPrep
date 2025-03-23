import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import authService from '../services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import '../styles/Login.css'; // Updated path for the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    const response = await authService.login(userData);
    dispatch(login(response));
  };

  return (
    <>
      <Navbar />
      <div className="login-container d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={handleSubmit} className="login-form p-5 border rounded shadow">
          <h2 className="text-center mb-4">Welcome Back</h2>
          <p className="text-center text-muted mb-4">Please login to your account</p>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <div className="text-center mt-3">
            <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
          </div>
          <div className="text-center mt-2">
            <p className="text-muted">Don't have an account? <a href="/signup" className="text-decoration-none">Sign Up</a></p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;