import React from 'react';
import { useParams } from 'react-router-dom';

const PlacementRounds = () => {
  const { companyId } = useParams();

  return (
    <div>
      <h1>Placement Rounds</h1>
      <ul>
        <li>
          <Link to={`/test/${companyId}/aptitude`}>Aptitude Round</Link>
        </li>
        <li>
          <Link to={`/test/${companyId}/coding`}>Coding Round</Link>
        </li>
        <li>
          <Link to={`/test/${companyId}/interview`}>Interview Round</Link>
        </li>
      </ul>
    </div>
  );
};

export default PlacementRounds;