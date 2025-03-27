const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Import the database connection
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const testRoutes = require('./routes/testRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const testController = require('./controllers/testController');
const authMiddleware = require('./middlewares/authMiddleware');

// Initialize Express app
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/tests', testRoutes);

// Protect the route with authMiddleware
app.get('/api/tests/:companyId/:round', authMiddleware, testController.getQuestionsByCompanyAndRound);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error middleware (must be the last middleware)
app.use(errorMiddleware);

// Start the server
const PORT = 5000; // Hardcoded port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});