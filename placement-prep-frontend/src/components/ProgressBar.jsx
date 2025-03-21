import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress" style={{ height: '20px', borderRadius: '10px' }}>
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        style={{ width: `${progress}%`, backgroundColor: '#76c7c0' }}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;