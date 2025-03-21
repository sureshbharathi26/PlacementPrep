import React from 'react';

const Button = ({ children, onClick, className = '', variant = 'primary', size = 'md', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;