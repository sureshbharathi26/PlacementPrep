// src/components/ManageAptitudeQuestions.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const ManageAptitudeQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [formData, setFormData] = useState({
    companyId: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });
  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/api/companies', { // Assuming /api/companies fetches companies
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompanies(response.data);
      } catch (err) {
        console.error('Failed to fetch companies:', err);
        setError(err.response?.data?.error || 'Failed to fetch companies');
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedCompanyId) {
        setQuestions([]);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/api/admin/questions', {
          headers: { Authorization: `Bearer ${token}` },
          params: { companyId: selectedCompanyId, round: 'aptitude' },
        });
        console.log('Fetched aptitude questions:', response.data);
        setQuestions(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch aptitude questions');
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedCompanyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const payload = {
        companyId: formData.companyId,
        round: 'aptitude',
        question: formData.question,
        options: formData.options,
        answer: formData.correctAnswer, // Send the selected option value
      };

      if (currentQuestion) {
        await axios.put(`/api/admin/questions/${currentQuestion.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/admin/questions', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setShowModal(false);
      fetchQuestions();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save question');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.delete(`/api/admin/questions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchQuestions();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete question');
      }
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="mt-4">
      <div className="mb-3">
        <Form.Label>Select Company:</Form.Label>
        <Form.Select value={selectedCompanyId} onChange={(e) => setSelectedCompanyId(e.target.value)}>
          <option value="">All Companies</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Form.Select>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <h3>Aptitude Questions</h3>
        <Button
          variant="primary"
          onClick={() => {
            setCurrentQuestion(null);
            setFormData({
              companyId: selectedCompanyId || '',
              question: '',
              options: ['', '', '', ''],
              correctAnswer: '',
            });
            setShowModal(true);
          }}
        >
          Add New Question
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Options</th>
            <th>Correct Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{q.question}</td>
              <td>
                <ul>
                  {JSON.parse(q.options).map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </ul>
              </td>
              <td>{q.correct_answer}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setCurrentQuestion(q);
                    setFormData({
                      companyId: q.company_id,
                      question: q.question,
                      options: JSON.parse(q.options),
                      correctAnswer: q.correct_answer,
                    });
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(q.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentQuestion ? 'Edit' : 'Add'} Aptitude Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Select
                name="companyId"
                value={formData.companyId}
                onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                required
              >
                <option value="">Select Company</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                required
              />
            </Form.Group>

            {formData.options.map((option, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Label>Option {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...formData.options];
                    newOptions[index] = e.target.value;
                    setFormData({ ...formData, options: newOptions });
                  }}
                  required
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Correct Answer (Text)</Form.Label>
              <Form.Control
                type="text"
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageAptitudeQuestions;