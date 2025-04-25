import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerDashboard from './pages/SellerDashboard';
import CreateSeller from './pages/CreateSeller';
import EditProduct from './pages/EditProduct';
import CreateProduct from './pages/CreateProduct';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={localStorage.getItem('token') ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route
          path="/create-seller"
          element={localStorage.getItem('token') ? <CreateSeller /> : <Navigate to="/login" />}
        />
        <Route
          path="/seller"
          element={localStorage.getItem('token') ? <SellerDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-product"
          element={localStorage.getItem('token') ? <CreateProduct /> : <Navigate to="/login" />}
        />
        <Route path="/edit-product" element={localStorage.getItem('token') ? <EditProduct /> : <Navigate to="/login" />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


