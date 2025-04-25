import React, { useState, useEffect } from 'react';
import { createProduct, getProductById, updateProduct } from '../../api/product';
import { getAllCategories } from '../../api/category';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchProduct = async () => {
        try {
          const product = await getProductById(id);
          setTitle(product.title);
          setDescription(product.description);
          setPrice(product.price);
          setSelectedCategory(product.category._id)
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { title, description, price, category: selectedCategory };
    try {
        if (!selectedImage) {
            alert('Please select an image for the product.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', selectedCategory);

        if (isEditMode) {
            await updateProduct(id, formData);
        } else {
            await createProduct(formData);
        }
        navigate('/seller-dashboard');
    } catch (error) {
        console.error('Error saving product:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
        setImagePreview(null)
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        {isEditMode ? 'Edit Product' : 'Add New Product'}
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
          <label htmlFor="image" className="block mb-2">Image:</label>
          <input type="file" id="image" className="w-full p-2 border rounded-md bg-gray-100" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Product Preview" className="mt-2 max-w-full h-48 object-cover rounded-lg" />}
      </div>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">
            Description:
          </label>
          <textarea
            id="description"
            className="w-full p-2 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2">
            Price:
          </label>
          <input
            type="number"
            id="price"
            className="w-full p-2 border rounded-md"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2">
            Category:
          </label>
          <select
            id="category"
            className="w-full p-2 border rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        > 
          {isEditMode ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddEditProduct;