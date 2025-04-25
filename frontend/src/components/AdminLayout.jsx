import React from 'react';
import NavBar from './NavBar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow bg-gray-100 p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;