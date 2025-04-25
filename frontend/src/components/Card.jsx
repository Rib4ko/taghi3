import React from 'react';

const Card = ({ children, className = '' }) => {
   return (
    <div className={`bg-light-background shadow-md rounded px-8 pt-6 pb-8 mb-4 ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => {
    return (
    <div className={`text-center text-text text-lg font-bold mb-4 border-b border-border pb-2 ${className}`}>
      {children}
    </div>
   );
};

const CardContent = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`mt-4 ${className}`}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardContent, CardFooter };