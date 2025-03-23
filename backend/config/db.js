// db.js
const mysql = require('mysql2');

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',       // Replace with your DB host
  user: 'root',            // Replace with your DB username
  password: '$$Suresh26', // Replace with your DB password
  database: 'placementprep', // Replace with your DB name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    process.exit(1); // Exit the process if the database connection fails
  }
  console.log('MySQL Connected...');
});

// Test database connection
db.query('SELECT 1 + 1 AS solution', (err, result) => {
  if (err) {
    console.error('Error testing database connection:', err.stack);
    process.exit(1); // Exit the process if the test query fails
  }
  console.log('Database test query result:', result[0].solution); // Should print 2
});

// Export the database connection
module.exports = db;