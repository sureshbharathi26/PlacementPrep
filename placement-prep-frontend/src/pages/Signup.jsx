import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/authSlice';
import authService from '../services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import '../styles/Signup.css'; // Custom CSS for Signup page

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const userData = { email, password };
    const response = await authService.register(userData);
    dispatch(register(response));
  };

  return (
    <>
      <Navbar />
      <div className="signup-container d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={handleSubmit} className="signup-form p-5 border rounded shadow">
          <h2 className="text-center mb-4">Create an Account</h2>
          <p className="text-center text-muted mb-4">Sign up to get started</p>
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          <div className="text-center mt-3">
            <p className="text-muted">Already have an account? <a href="/login" className="text-decoration-none">Login</a></p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
