import React, { useState } from 'react';
import authService from '../services/authService';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../pages/Signup.css'; // Import the CSS file

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is 'student'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register({ name, email, password, role });
      alert('Registration Successful! Please Login.');
      navigate('/login'); // Redirect to login page after registration
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.error || error.message);
      alert(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            <div className="text-center mt-3">
              <a href="/login">Already have an account? Login</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;