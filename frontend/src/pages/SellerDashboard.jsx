import React, { useState, useEffect } from 'react';
import { getMe } from '../api/auth';
import Loading from '../components/Loading';
import { getMyProducts, deleteProduct} from '../api/product';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
const SellerDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          localStorage.removeItem('token');
          return;
        }
        const userData = await getMe(token);
        setUser(userData);
        if (!userData || userData.role !== 'seller') {
          localStorage.removeItem('token');
          navigate('/');
        }
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const token = localStorage.getItem('token');
        const data = await getMyProducts(token);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };
    const handleDeleteProduct = async (id) => {
        try {
          const token = localStorage.getItem('token');
          await deleteProduct(id, token);
          setProducts(products.filter((product) => product.id !== id));
          alert('Product deleted!');
        } catch (error) {
          console.error('Error deleting product:', error);
        }    
    };
    
    fetchProducts();
    fetchUser();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      {loading && <Loading />}
      <h1 className="text-4xl font-bold mb-6">Seller Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loadingProducts && <Loading />}
        {products.map((product) => (
          <div key={product.id} className='border p-4 flex flex-col'>
            <h2 className='font-bold text-xl'>{product.title}</h2>
            <p>{product.description}</p>
            <p className='font-bold'>Price: ${product.price}</p>
            <div className='mt-auto flex'>
                <Link
                  to={`/edit-product/${product.id}`}
                >
                </Link>
                    <button className='bg-primary text-white px-4 py-2 rounded-md mr-2'>Edit
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)} className='bg-red-500 text-white px-4 py-2 rounded-md mr-2'>Delete</button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;