const express = require('express');
const cors = require('cors');
const db = require('./config/db.js'); // Import the database connection
const authRoutes = require('./routes/authRoutes.js');
const companyRoutes = require('./routes/companyRoutes.js');
const testRoutes = require('./routes/testRoutes.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');
const testController = require('./controllers/testController.js');
const authMiddleware = require('./middlewares/authMiddleware.js');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const questionRoutes = require('./routes/questionRoutes.js'); // Import question routes
const roundStatusRoutes = require('./routes/roundStatusRoutes'); // Import round status routes

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
app.use('/api/questions', questionRoutes); // Add question routes
app.use('/api/round-status', roundStatusRoutes); // Add round status routes

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