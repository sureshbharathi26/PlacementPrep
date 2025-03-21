import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust the path based on your folder structure

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <h1 className="mb-4">Welcome to Placement Prep</h1>
        <img 
          src="https://via.placeholder.com/600x300" 
          alt="Placement Prep" 
          className="img-fluid mb-4"
        />
        <p className="lead">
          This is the ultimate platform for students preparing for placements. 
          Access resources, practice problems, and get ready to ace your interviews!
        </p>
        <Link to="/company">
          <button className="btn btn-primary">Start Preparing</button>
        </Link>
      </div>
    </>
  );
};

export default Home;