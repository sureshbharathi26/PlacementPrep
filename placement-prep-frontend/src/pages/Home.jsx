import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust the path based on your folder structure
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import image1 from '../assets/image4.jpg'; // Adjust the path based on your folder structure  
import AboutUs from './AboutUs'; // Import the AboutUs component

const Home = () => {
  const backgroundStyle = {
    backgroundImage: `url(${image1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    color: '#fff',
  };

  const textStyle = {
    textAlign: 'left',
    fontSize: '1.5rem',
  };

  const headingStyle = {
    fontSize: '4rem', // Adjust the size as needed
    marginTop: '10rem', // Increase the top margin
  };

  return (
    <>
      <Navbar />
      <div style={backgroundStyle}>
        <div className="container pt-5" style={textStyle}>
          <h1 className="display-3 mb-4 text-muted" style={headingStyle}>
            Welcome to PlacementPrep
          </h1>
          <p className="lead col-md-6 text-muted">
            This is the ultimate platform for students preparing for placements. 
            Access resources, practice problems, and get ready to ace your interviews!
          </p>
          <Link to="/company">
            <button className="btn btn-primary btn-lg mt-3">Start Preparing</button>
          </Link>
        </div>
      </div>
      {/* Use the AboutUs component */}
      <AboutUs />
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p className="mb-1">Contact Us: support@placementprep.com | +1 234 567 890</p>
        <p className="mb-0">&copy; {new Date().getFullYear()} PlacementPrep. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;