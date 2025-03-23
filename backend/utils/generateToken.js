const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: '1h' } // Expiry time
  );
};

module.exports = generateToken;
