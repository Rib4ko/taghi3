import React, { useState, useEffect } from 'react';
import { updateProduct, getProduct, getAllCategories} from '../api/product';
import Select from '../components/Select'
import Loading from '../components/Loading';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../api/upload';

const EditProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [oldImage, setOldImage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const productData = await getProduct(id, token);
            setTitle(productData.title);
            setDescription(productData.description);
            setPrice(productData.price);
            setSelectedCategory(productData.category ? productData.category._id: '')
            setOldImage(productData.image)
            setImagePreview(productData.image)

        } catch (error) {
            console.error('Error fetching product:', error);
            setError(error.message || 'Failed to load product data.');
        } finally {
            setLoading(false);
        }
    };
    const fetchCategories = async () => {
      try {
          const token = localStorage.getItem('token');
          const categoriesData = await getAllCategories(token);
          setCategories(categoriesData);
      } catch (error) {
          console.error('Error fetching categories:', error);
      }
  };

    fetchProduct();
    fetchCategories();


  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      let imageUrl = null;
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        imageUrl = await uploadImage(formData);
      }

      await updateProduct(id, title, description, price, selectedCategory, imageUrl ? imageUrl : oldImage, token);
      alert('Update successful!');
    } catch (error) {
      if (error.message.includes('Failed to upload image')) {
        const formData = new FormData();
        formData.append('image', image);
        try{
          await uploadImage(formData);
        }
        catch(err)
        {
          alert(err.message || 'Image upload failed');
        }
      }

      alert(error.message || 'Update failed');
      setError(error.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(oldImage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Edit Product</h1>
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
        <Select
            label="Category"
            options={categories}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
        />
        <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image
            </label>
            <input
                type="file"
                id="image"
                name="image"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={handleImageChange}
            />
            {imagePreview && (
                <img src={imagePreview} alt="Product Preview" className="mt-2 w-32 h-32 object-cover" />
            )}
        </div>
        <Button type="submit">Update</Button>
        {error && <div className="text-error">{error}</div>}
      </Form>
    </div>
  );
};

export default EditProduct;