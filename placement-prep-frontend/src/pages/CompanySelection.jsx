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
      <div className="container mt-5" style={{ position: 'absolute', marginTop: '6rem',marginLeft:'7rem' }}>
        <h1 className="text-center mt-5 mb-5">Select a Company</h1>
        {/* Increased margin-bottom from mb-4 to mb-5 */}
        {loading && <p className="text-center mt-5">Loading...</p>}
        {error && <p className="text-center mt-5 text-danger">Error: {error}</p>}

        {!loading && !error && (
          <div className="row">
            {companies?.length > 0 ? (
              companies.map((company) => (
                <div
                  key={company.id}
                  className="col-md-4 mb-4"
                  onClick={() => navigate(`/placement-rounds/${company.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card shadow-sm h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title">{company.name}</h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mt-3">No companies available</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CompanySelection;
