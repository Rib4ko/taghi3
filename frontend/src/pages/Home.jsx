jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';


const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to our E-commerce store!</h1>
      <Link to="/products">
        <Button>View Products</Button>
      </Link>
    </div>
  );
}

export default Home;