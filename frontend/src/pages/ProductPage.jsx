import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function Product() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (query) => {
    try {
      const response = await fetch(`/api/products/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);
  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-3xl font-bold text-center mb-6'>Product Page</h1>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map(product => (
          <li key={product.id} className='bg-white p-6 rounded-lg shadow-md'>
                        <h2 className='text-xl font-semibold mb-2'>{product.name}</h2>
            <p className='text-gray-700'>Price: ${product.price}</p>          </li>
        ))}
      </ul>
    </div>
  );
}

export default Product;