import React from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Navbar from '../components/Navbar';

const PlacementRounds = () => {
  const { id } = useParams(); // Use 'id' instead of 'companyId'

  return (
    <>
    <Navbar/>
      <div className="container mt-5">
      <h1 className="text-center mb-4">Placement Rounds</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to={`/test/${id}/aptitude`} className="text-decoration-none">
            Aptitude Round
          </Link>
        </li>
        <li className="list-group-item">
          <Link to={`/test/${id}/coding`} className="text-decoration-none">
            Coding Round
          </Link>
        </li>
        <li className="list-group-item">
          <Link to={`/test/${id}/interview`} className="text-decoration-none">
            Interview Round
          </Link>
        </li>
      </ul>
    </div>
    </>
  );
};

export default PlacementRounds;
