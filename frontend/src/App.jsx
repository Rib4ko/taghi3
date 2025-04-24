import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/Admin/Users';
import AdminProducts from './pages/Admin/Products';
import AdminCategories from './pages/Admin/Categories';
import AdminOrders from './pages/Admin/Orders';
import SellerProducts from './pages/Seller/Products';
import ProductPage from './pages/ProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <Router>
      <Header />


      <Routes>
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/seller/products" element={<SellerProducts />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductPage/>}/>
        <Route path="/product/:id" element={<ProductDetailsPage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;