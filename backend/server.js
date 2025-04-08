const express = require('express');
const cors = require('cors');
const db = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const companyRoutes = require('./routes/companyRoutes.js');
const testRoutes = require('./routes/testRoutes.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');
const testController = require('./controllers/testController.js');
const authMiddleware = require('./middlewares/authMiddleware.js');
const dotenv = require('dotenv');
dotenv.config(); 
const questionRoutes = require('./routes/questionRoutes.js'); 
const roundStatusRoutes = require('./routes/roundStatusRoutes'); 
const adminRoutes = require('./routes/adminRoutes'); 

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/round-status', roundStatusRoutes); 
app.use('/api/admin', adminRoutes); 


app.get('/api/tests/:companyId/:round', authMiddleware, (req, res, next) => {
  const { round } = req.params;
  if (!round) {
    return res.status(400).json({ error: 'Round parameter is missing' });
  }
  next();
}, testController.getQuestionsByCompanyAndRound);


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


app.use(errorMiddleware);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});