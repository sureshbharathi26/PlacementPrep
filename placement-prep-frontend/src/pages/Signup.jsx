import React, { useState } from 'react';
import authService from '../services/authService';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register({ name, email, password, role });
      alert('Registration Successful! Please Login.');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-5 shadow-lg" style={{ width: '400px', borderRadius: '15px' }}>
          <form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4 text-success">Sign Up</h2>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Sign Up</button>
            <div className="text-center mt-3">
              <a href="/login" className="text-decoration-none text-success">Already have an account? Login</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
