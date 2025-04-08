import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('aptitude');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    companyId: '',
    question: '',
    options: ['', '', '', ''],
    answer: '',
    sampleInput: '',
    sampleOutput: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [companyFormData, setCompanyFormData] = useState({ name: '' });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/api/companies', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCompanies(response.data);
      } catch (err) {
        setError('Failed to fetch companies');
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (formData.companyId) fetchQuestions();
  }, [activeTab, formData.companyId]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('authToken');
      const response = await axios.get('/api/admin/questions', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          companyId: formData.companyId,
          round: activeTab
        }
      });

      const mappedQuestions = response.data.map(q => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : JSON.parse(q.options || '[]'),
        answer: q.correctAnswer || q.answer
      }));

      setQuestions(mappedQuestions);
    } catch (err) {
      setError('Failed to fetch questions');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      const payload = {
        companyId: formData.companyId,
        round: activeTab,
        question: formData.question,
        options: activeTab === 'aptitude' ? formData.options.filter(opt => opt.trim()) : [],
        correctAnswer: formData.answer || '',
        sampleInput: activeTab === 'coding' ? formData.sampleInput || null : null,
        sampleOutput: activeTab === 'coding' ? formData.sampleOutput || null : null
      };

      if (currentQuestion) {
        await axios.put(`/api/admin/questions/${currentQuestion.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccessMessage('Question updated successfully.');
      } else {
        await axios.post('/api/admin/questions', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccessMessage('Question added successfully.');
      }

      setShowModal(false);
      resetForm();
      fetchQuestions();
    } catch (err) {
      setError('Failed to save question');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`/api/admin/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchQuestions();
    } catch (err) {
      setError('Failed to delete question');
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setSuccessMessage(null);
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('/api/companies', { name: companyFormData.name }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage('Company added successfully.');
      setCompanyFormData({ name: '' });
      fetchCompanies();
    } catch (err) {
      setError('Failed to add company');
    }
  };

  const handleDeleteCompany = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`/api/companies/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage('Company deleted successfully.');
      setCompanies(companies.filter((company) => company.id !== id)); // Update state immediately
    } catch (err) {
      setError('Failed to delete company');
    }
  };

  const resetForm = () => {
    setFormData({
      companyId: formData.companyId,
      question: '',
      options: ['', '', '', ''],
      answer: '',
      sampleInput: '',
      sampleOutput: ''
    });
    setCurrentQuestion(null);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Admin Dashboard</h2>

        {/* Show only one alert at a time */}
        {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
        {!error && successMessage && <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>{successMessage}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Select Company</Form.Label>
          <Form.Select
            value={formData.companyId}
            onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
            required
          >
            <option value="">Select a company</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
          <Tab eventKey="companies" title="Manage Companies">
            <div className="mb-3">
              <Form onSubmit={handleCompanySubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={companyFormData.name}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, name: e.target.value })}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">Add Company</Button>
              </Form>
            </div>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company, index) => (
                  <tr key={company.id}>
                    <td>{index + 1}</td>
                    <td>{company.name}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteCompany(company.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>

          {['aptitude', 'coding'].map((tab) => (
            <Tab eventKey={tab} title={`${tab.charAt(0).toUpperCase() + tab.slice(1)} Questions`} key={tab}>
              <div className="d-flex justify-content-end mb-3">
                <Button
                  variant="primary"
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  disabled={!formData.companyId}
                >
                  Add Question
                </Button>
              </div>

              {loading ? (
                <Spinner animation="border" />
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Question</th>
                      {tab === 'aptitude' && <th>Options</th>}
                      <th>Answer</th>
                      {tab === 'coding' && <th>Sample Input</th>}
                      {tab === 'coding' && <th>Sample Output</th>}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.length > 0 ? (
                      questions.map((q, index) => (
                        <tr key={q.id}>
                          <td>{index + 1}</td>
                          <td>{q.question}</td>
                          {tab === 'aptitude' && (
                            <td><ol>{q.options.map((opt, i) => <li key={i}>{opt}</li>)}</ol></td>
                          )}
                          <td>{q.answer}</td>
                          {tab === 'coding' && <td>{q.sampleInput}</td>}
                          {tab === 'coding' && <td>{q.sampleOutput}</td>}
                          <td>
                            <Button size="sm" variant="info" className="me-2" onClick={() => {
                              setCurrentQuestion(q);
                              setFormData({
                                companyId: q.company_id,
                                question: q.question,
                                options: q.options || ['', '', '', ''],
                                answer: q.answer,
                                sampleInput: q.sample_input || '',
                                sampleOutput: q.sample_output || ''
                              });
                              setShowModal(true);
                            }}>Edit</Button>
                            <Button size="sm" variant="danger" onClick={() => handleDelete(q.id)}>Delete</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={tab === 'aptitude' ? 5 : 6} className="text-center">
                          {formData.companyId ? 'No questions found' : 'Please select a company'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </Tab>
          ))}
        </Tabs>

        <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{currentQuestion ? 'Edit' : 'Add'} Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                />
              </Form.Group>

              {activeTab === 'aptitude' && (
                <>
                  {formData.options.map((opt, index) => (
                    <Form.Group className="mb-3" key={index}>
                      <Form.Label>Option {index + 1}</Form.Label>
                      <Form.Control
                        type="text"
                        value={opt}
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
                    <Form.Label>Correct Answer</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.answer}
                      onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                      required
                    />
                  </Form.Group>
                </>
              )}

              {activeTab === 'coding' && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Sample Input</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={formData.sampleInput}
                      onChange={(e) => setFormData({ ...formData, sampleInput: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Sample Output</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={formData.sampleOutput}
                      onChange={(e) => setFormData({ ...formData, sampleOutput: e.target.value })}
                    />
                  </Form.Group>
                </>
              )}

              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</Button>
                <Button variant="primary" type="submit">{currentQuestion ? 'Update' : 'Save'}</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AdminPage;