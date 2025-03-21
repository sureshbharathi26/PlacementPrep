import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '../redux/companySlice';
import { Link } from 'react-router-dom';

const CompanySelection = () => {
  const dispatch = useDispatch();
  const { companies, loading } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Select a Company</h1>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <Link to={`/placement-rounds/${company.id}`}>{company.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanySelection;