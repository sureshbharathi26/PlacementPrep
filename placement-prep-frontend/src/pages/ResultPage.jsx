import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ResultsPage = () => {
  return (
    <div className="container text-center mt-5">
      <div className="card shadow p-4">
        <h1 className="text-success">Test Results</h1>
        <p className="lead">Congratulations! You have passed the test.</p>
      </div>
    </div>
  );
};

export default ResultsPage;