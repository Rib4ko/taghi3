import React, { useState } from 'react';
import { createProduct } from '../api/product';
import Loading from '../components/Loading';
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';

const CreateProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      await createProduct(title, description, price, token);
      alert('Create product successful!');
      setTitle('');
      setDescription('');
      setPrice('');
    } catch (error) {
      setError(error.message || 'Create product failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Create Product</h1>
      {loading && <Loading />}
      <Form onSubmit={handleSubmit}>
        <Input
          label="Title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          label="Price"
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button type="submit">Create Product</Button>
        {error && <div className="text-error">{error}</div>}
      </Form>
    </div>
  );
};

export default CreateProduct;