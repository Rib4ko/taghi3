import React from 'react';
import { useRouter } from 'next/navigation';

function Header({ searchQuery, setSearchQuery }) {
  const router = useRouter();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    router.push(`/products?q=${searchQuery}`);
  };

    return (
        <header className='flex items-center w-full justify-center'>
            <div className='flex items-center justify-center w-full'>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button onClick={handleSearchClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Search</button>
      </div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>          <li><a href="/products">Products</a></li>
          <li><a href="/categories">Categories</a></li>          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;