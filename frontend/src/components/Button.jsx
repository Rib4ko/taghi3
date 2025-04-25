import React from 'react';

const Button = ({ children, type = "button", onClick, className = "" }) => {
  return (
    <button
      type={type}
      className={`bg-primary text-light-background font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;