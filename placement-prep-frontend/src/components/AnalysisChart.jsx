// src/components/AnalysisChart.jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Spinner, Alert, Form } from 'react-bootstrap';
import axios from 'axios';

const AnalysisChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('/api/admin/participation', {
        headers: { Authorization: `Bearer ${token}` } // Add Authorization header
      });
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch participation data:', error);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title className="mb-4">User Participation Analysis</Card.Title>
        
        <div style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.filter(item => item.round_name === 'Aptitude')}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="company_name" 
                angle={-45} 
                textAnchor="end" 
                height={70} 
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="participants_count" fill="#8884d8" name="Participants" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Company</th>
              <th>Participants (Aptitude)</th>
              <th>Total Users</th>
              <th>Participation Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.filter(item => item.round_name === 'Aptitude').map((item, index) => (
              <tr key={index}>
                <td>{item.company_name}</td>
                <td>{item.participants_count}</td>
                <td>{item.total_users}</td>
                <td>{item.participation_rate}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AnalysisChart;