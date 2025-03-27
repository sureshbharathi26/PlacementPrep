import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust the path based on your folder structure
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import image1 from '../assets/image4.jpg'; // Adjust the path based on your folder structure  

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
      <div className="container mt-5 p-4" style={{ backgroundColor: '#000', color: '#fff', borderRadius: '8px' }}>
        <h2 className="display-4 text-center mb-4 text-light">About Us</h2>
        <p className="lead text-light">
          Welcome to <strong>PlacementPrep</strong>, your ultimate companion for placement preparation. 
          Our mission is to empower students with the tools and resources they need to excel in their 
          placement journey and secure their dream jobs.
        </p>
        <p className="text-light">
          At PlacementPrep, we provide a comprehensive platform that includes:
        </p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item bg-dark text-light">Curated resources for technical and non-technical skills.</li>
          <li className="list-group-item bg-dark text-light">Practice problems to enhance problem-solving abilities.</li>
          <li className="list-group-item bg-dark text-light">Mock interviews to build confidence and improve performance.</li>
          <li className="list-group-item bg-dark text-light">Insights into company-specific interview patterns and questions.</li>
        </ul>
        <p className="text-light mt-3">
          Whether you're a beginner or an experienced candidate, our platform is designed to cater to 
          your needs and help you succeed in your career aspirations.
        </p>
        <p className="text-light">
          Join us on this journey to unlock your potential and achieve your goals. Together, let's 
          make your placement preparation efficient, effective, and enjoyable!
        </p>
      </div>
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p className="mb-1">Contact Us: support@placementprep.com | +1 234 567 890</p>
        <p className="mb-0">&copy; {new Date().getFullYear()} PlacementPrep. All rights reserved.</p>
      </footer>
      <style>
        {`
          .list-group-item {
            transition: transform 0.3s ease, background-color 0.3s ease;
          }
          .list-group-item:hover {
            transform: scale(1.05);
            background-color: #333;
          }
        `}
      </style>
    </>
  );
};

export default Home;