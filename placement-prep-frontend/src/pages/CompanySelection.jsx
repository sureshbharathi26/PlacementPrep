import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '../redux/companySlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

const CompanySelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies, loading, error } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Select a Company</h1>

        {loading && <p className="text-center mt-5">Loading...</p>}
        {error && <p className="text-center mt-5 text-danger">Error: {error}</p>}

        {!loading && !error && (
          <ul className="list-group">
            {companies?.length > 0 ? (
              companies.map((company) => (
                <li
                  key={company.id}
                  className="list-group-item"
                  onClick={() => navigate(`/placement-rounds/${company.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {company.name}
                </li>
              ))
            ) : (
              <p className="text-center mt-3">No companies available</p>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default CompanySelection;
