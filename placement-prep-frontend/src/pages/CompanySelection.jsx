import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '../redux/companySlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import { Skeleton } from 'antd';
import { Fade } from 'react-awesome-reveal';
import { FiArrowRight, FiBriefcase } from 'react-icons/fi';
import axios from 'axios';

const CompanySelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies, loading, error } = useSelector((state) => state.company);
  const [sampleData, setSampleData] = useState({});

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const fetchSampleData = async (questionId) => {
    try {
      const response = await axios.get(`/api/questions/${questionId}/sample`);
      console.log(`Sample data for question ID ${questionId}:`, response.data); // Debug log
      setSampleData((prev) => ({
        ...prev,
        [questionId]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching sample data:', error);
    }
  };

  return (
    <div className="company-selection-page" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar />
      
      <div className="container py-5">
        <Fade direction="down" duration={300}>
          <div className="text-center mb-5">
            <h1 className="display-4 font-weight-bold text-primary mb-3">
              <FiBriefcase className="mr-2" />
              Select a Company
            </h1>
            <p className="lead text-muted">
              Choose a company to view available placement rounds
            </p>
          </div>
        </Fade>

        {loading && (
          <div className="row">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="col-lg-4 col-md-6 mb-4">
                <Skeleton active paragraph={{ rows: 4 }} />
              </div>
            ))}
          </div>
        )}

        {error && (
          <Fade duration={300}>
            <div className="alert alert-danger text-center mx-auto" style={{ maxWidth: '500px' }}>
              <strong>Error:</strong> {error}
            </div>
          </Fade>
        )}

        {!loading && !error && (
          <Fade cascade duration={200} damping={0.1}>
            <div className="row">
              {companies?.length > 0 ? (
                companies.map((company) => (
                  <div key={company.id} className="col-lg-4 col-md-6 mb-4">
                    <div 
                      className="card h-100 border-0 shadow-sm hover-shadow transition-all"
                      onClick={() => {
                        navigate(`/placement-rounds/${company.id}`);
                        fetchSampleData(company.id); // Fetch sample data for the company
                      }}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '12px',
                        transition: 'transform 0.3s, box-shadow 0.3s'
                      }}
                    >
                      <div className="card-body d-flex flex-column">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 p-3 rounded-circle mr-3">
                            <FiBriefcase size={24} className="text-primary" />
                          </div>
                          <h5 className="card-title font-weight-bold mb-0">{company.name}</h5>
                        </div>
                        <p className="text-muted flex-grow-1">
                          {company.description || 'Explore placement opportunities with this company'}
                        </p>
                        {sampleData[company.id] && (
                          <div className="mt-3">
                            <h6>Sample Input:</h6>
                            <pre>{sampleData[company.id].sample_input || 'No sample input available'}</pre>
                            <h6>Sample Output:</h6>
                            <pre>{sampleData[company.id].sample_output || 'No sample output available'}</pre>
                          </div>
                        )}
                        <div className="d-flex align-items-center text-primary mt-3">
                          <span>View rounds</span>
                          <FiArrowRight className="ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <div className="card border-0 shadow-sm py-5">
                    <div className="card-body">
                      <FiBriefcase size={48} className="text-muted mb-3" />
                      <h4 className="text-muted">No companies available</h4>
                      <p className="text-muted">Check back later for updates</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Fade>
        )}
      </div>
      <style>
        {`
          .hover-shadow:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
          }
          .card {
            transition: all 0.3s ease;
          }
          .card:hover {
            border-color: rgba(13, 110, 253, 0.3);
          }
        `}
      </style>
    </div>
  );
};

export default CompanySelection;