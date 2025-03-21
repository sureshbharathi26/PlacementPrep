const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message || 'Something went wrong!',
    });
  };
  
  module.exports = errorMiddleware;