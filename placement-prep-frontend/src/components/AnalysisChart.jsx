import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Card, Spinner, Alert, Table, Form
} from 'react-bootstrap';
import axios from 'axios';

const AnalysisChart = ({ companyId }) => {
  const [data, setData] = useState([]);
  const [loginCount, setLoginCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');

        // Fetch participation data
        const [participationRes, loginRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/participation', {
            headers: { Authorization: `Bearer ${token}` },
            params: { companyId, timeRange }
          }),
          axios.get('http://localhost:5000/api/admin/logins', {
            headers: { Authorization: `Bearer ${token}` },
            params: { timeRange }
          }),
        ]);

        setData(participationRes.data);
        setLoginCount(loginRes.data.loginCount);
      } catch (err) {
        setError('Failed to fetch analysis data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) fetchAnalysisData();
  }, [companyId, timeRange]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const filteredData = data.filter(item => item.round_name === 'Aptitude');

  return (
    <Card className="mt-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title>User Participation Analysis</Card.Title>
          <Form.Select
            style={{ width: '150px' }}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </Form.Select>
        </div>

        <h5>Total Users Logged In: <strong>{loginCount}</strong></h5>

        <div style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company_name" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="participants_count" fill="#8884d8" name="Participants" />
              <Bar dataKey="completion_rate" fill="#82ca9d" name="Completion %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Company</th>
              <th>Participants (Aptitude)</th>
              <th>Completed</th>
              <th>Completion Rate</th>
              <th>Avg. Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.company_name}</td>
                <td>{item.participants_count}</td>
                <td>{item.completed_count}</td>
                <td>{item.completion_rate}%</td>
                <td>{item.average_score || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AnalysisChart;
