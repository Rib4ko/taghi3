import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../api/auth'

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <header className="bg-light-background shadow-md ">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-text font-bold text-xl ">
          Your Logo
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6 ">
            <li>
              <Link to="/" className="hover:text-primary transition-colors ">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-primary transition-colors ">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors ">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-primary transition-colors">
                Login
              </Link>
            </li>
            {localStorage.getItem('token') && (
            <li>
              <Link to="/create-product" className="hover:text-primary transition-colors">
                Create Product
              </Link>
            </li>
          )}
            {localStorage.getItem('token') && (
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </li>)}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header