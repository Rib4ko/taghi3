import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import SellerDashboard from './pages/SellerDashboard';
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';
import ManageCategories from './pages/Admin/ManageCategories';
import { getUser } from './api/user';
import NavBar from './components/NavBar';
import UserProfile from './pages/UserProfile';
import SellerOrders from './pages/SellerOrders';
import ShoppingCart from './pages/ShoppingCart';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import Wishlist from './pages/Wishlist';
import RevenueByCategory from './pages/admin/RevenueByCategory';
import TopSellingProducts from './pages/admin/TopSellingProducts';
import OrdersByStatus from './pages/admin/OrdersByStatus';
import NewUsersPerMonth from './pages/admin/NewUsersPerMonth';

const ProtectedRoute = ({ user, allowedRoles, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const [user, setUser] = useState(() => getUser());
  
  return (
    <Router>
      <NavBar user={user} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Products />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<ProtectedRoute user={user}><UserProfile /></ProtectedRoute>} />
        <Route
          path="/order-history"
          element={<ProtectedRoute user={user}>
            <OrderHistory />
          </ProtectedRoute>}
        />
        <Route 
          path="/order/:id" 
          element={<ProtectedRoute user={user}><OrderDetails /></ProtectedRoute>} 
        />
        <Route
          path="/seller-dashboard"
          element={<ProtectedRoute user={user} allowedRoles={['seller', 'admin']}>          
            <SellerDashboard />
          </ProtectedRoute>}
        />
        <Route
          path="/edit-product/:id"
          element={<ProtectedRoute user={user} allowedRoles={['seller', 'admin']}>          
            <EditProduct />
          </ProtectedRoute>}
        />
        <Route 
          path="/add-product"
          element={<ProtectedRoute user={user} allowedRoles={['seller', 'admin']}>          
            <AddProduct />
          </ProtectedRoute>} 
        />
        <Route 
          path="/admin/manage-categories" 
          element={<ProtectedRoute user={user} allowedRoles={['admin']}>          
            <ManageCategories />          
          </ProtectedRoute>} 
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute user={user}>
              <ShoppingCart />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/seller-orders"
          element={<ProtectedRoute user={user} allowedRoles={['seller', 'admin']}>
            <SellerOrders />
          </ProtectedRoute>}
        />
        <Route
          path="/wishlist"
          element={<ProtectedRoute user={user}>
            <Wishlist />
          </ProtectedRoute>}
        />
        <Route 
          path="/admin/revenue-by-category" 
          element={
            <ProtectedRoute user={user} allowedRoles={['admin']}>
              <RevenueByCategory />
            </ProtectedRoute>
          } 
        />
        <Route path="/admin/top-selling-products" element={
          <ProtectedRoute user={user} allowedRoles={['admin']}>
            <TopSellingProducts />
          </ProtectedRoute>
        } />
        <Route path="/admin/orders-by-status" element={
          <ProtectedRoute user={user} allowedRoles={['admin']}>
            <OrdersByStatus />
          </ProtectedRoute>
        } />
        <Route path="/admin/new-users-per-month" element={
          <ProtectedRoute user={user} allowedRoles={['admin']}>
            <NewUsersPerMonth />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
};

export default App;