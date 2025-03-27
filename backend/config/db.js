const mysql = require('mysql2');

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',       // Replace with your DB host
  user: 'root',            // Replace with your DB username
  password: '$$Suresh26',  // Replace with your DB password
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

// Export the database connection
module.exports = db;