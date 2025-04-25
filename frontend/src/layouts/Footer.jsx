import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light-background text-text text-center py-4 shadow-md">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Your Company</p>
      </div>
    </footer>
  );
};

export default Footer;