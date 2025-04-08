// src/components/ManageCodingQuestions.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Alert, Spinner, Modal } from 'react-bootstrap';
import axios from 'axios';

const ManageCodingQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [formData, setFormData] = useState({
    companyId: '',
    questionTitle: '',
    questionDescription: '',
    difficultyLevel: 'Easy',
    testCases: '[]',
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [questionToDeleteId, setQuestionToDeleteId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/coding-questions'); // Replace with your API endpoint
      setQuestions(response.data);
    } catch (err) {
      setError('Failed to fetch coding questions.');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (question = null) => {
    setCurrentQuestion(question);
    setFormData({
      companyId: question?.companyId || '',
      questionTitle: question?.questionTitle || '',
      questionDescription: question?.questionDescription || '',
      difficultyLevel: question?.difficultyLevel || 'Easy',
      testCases: JSON.stringify(question?.testCases || []),
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentQuestion(null);
    setFormData({
      companyId: '',
      questionTitle: '',
      questionDescription: '',
      difficultyLevel: 'Easy',
      testCases: '[]',
    });
    setSuccessMessage(null);
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    console.log('Form submitted'); // Debug log
    console.log('Form data:', formData); // Debug log

    try {
      const testCasesArray = JSON.parse(formData.testCases);
      const payload = { ...formData, testCases: testCasesArray };

      if (currentQuestion) {
        console.log('Updating question:', currentQuestion._id); // Debug log
        await axios.put(`/api/coding-questions/${currentQuestion._id}`, payload); // Replace with your API endpoint
        setSuccessMessage('Coding question updated successfully!');
      } else {
        console.log('Creating new question'); // Debug log
        await axios.post('/api/coding-questions', payload); // Replace with your API endpoint
        setSuccessMessage('Coding question created successfully!');
      }

      fetchQuestions();
      setTimeout(closeModal, 1500); // Close modal after successful submission
    } catch (err) {
      console.error('Error:', err.response?.data?.message || 'Failed to save coding question.');
      setError(err.response?.data?.message || 'Failed to save coding question.');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteConfirmation = (id) => {
    setQuestionToDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setQuestionToDeleteId(null);
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await axios.delete(`/api/coding-questions/${questionToDeleteId}`); // Replace with your API endpoint
      setSuccessMessage('Coding question deleted successfully!');
      fetchQuestions();
      closeDeleteConfirmation();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete coding question.');
      console.error('Error deleting question:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Manage Coding Questions</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Button variant="primary" className="mb-3" onClick={() => openModal()}>
        Add New Question
      </Button>

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company ID</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question._id}>
                <td>{question._id}</td>
                <td>{question.companyId}</td>
                <td>{question.questionTitle}</td>
                <td>{question.difficultyLevel}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => openModal(question)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => openDeleteConfirmation(question._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {questions.length === 0 && <tr><td colSpan="5">No coding questions found.</td></tr>}
          </tbody>
        </Table>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentQuestion ? 'Edit Question' : 'Add New Question'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Company ID</Form.Label>
              <Form.Control
                type="text"
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question Title</Form.Label>
              <Form.Control
                type="text"
                name="questionTitle"
                value={formData.questionTitle}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="questionDescription"
                value={formData.questionDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Difficulty Level</Form.Label>
              <Form.Control
                as="select"
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Test Cases (JSON Array)</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="testCases"
                value={formData.testCases}
                onChange={handleChange}
                placeholder="e.g., [{'input': [1, 2], 'output': 3}, {'input': [4, 5], 'output': 9}]"
              />
              <Form.Text className="text-muted">
                Please provide test cases in a valid JSON array format.
              </Form.Text>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                currentQuestion ? 'Update Question' : 'Save Question'
              )}
            </Button>
            <Button variant="secondary" onClick={closeModal} className="ms-2" disabled={loading}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirmation} onHide={closeDeleteConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this coding question?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageCodingQuestions;