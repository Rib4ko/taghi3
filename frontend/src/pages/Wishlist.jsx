// Combined Corrected Code (350+ lines)

// frontend/src/pages/Wishlist.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../api/user';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const user = getUser();

    useEffect(() => {
        const storedWishlist = localStorage.getItem(`wishlist-${user?.id}`);
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, [user?.id]);

    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter(item => item.product._id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem(`wishlist-${user?.id}`, JSON.stringify(updatedWishlist));
    };

    if (!user) {
        return <div className="container mx-auto p-4">You must be logged in to view your wishlist.</div>;
    }

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">My Wishlist</h1>
            {wishlist.length === 0 ? (
                <p className="text-center">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {wishlist.map((item, index) => (
                        <div key={index} className="bg-white border rounded-lg p-4 shadow-md m-2 hover:shadow-lg transition duration-300">
                            <div className="flex flex-col h-full">
                                <Link to={`/product/${item.product._id}`}>
                                    <img src={item.product.image} alt={item.product.title} className="w-full h-48 object-cover rounded-lg mb-2" />
                                    <h3 className="text-lg font-semibold text-gray-800">{item.product.title}</h3>
                                </Link>
                                <div className="mt-auto">
                                    <p className="text-blue-600 font-bold mt-1">{item.product.price}€</p>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
                                        onClick={() => removeFromWishlist(item.product._id)}
                                    >
                                        Remove from Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// frontend/src/pages/ProductDetails.jsx
const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = getUser();
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (user && product) {
            const storedWishlist = localStorage.getItem(`wishlist-${user.id}`);
            if (storedWishlist) {
                const wishlist = JSON.parse(storedWishlist);
                setIsAddedToWishlist(wishlist.some(item => item.product._id === product._id));
            }
        }
    }, [user, product]);

    const addToWishlist = () => {
        if (!user) return;
        const storedWishlist = localStorage.getItem(`wishlist-${user.id}`);
        let wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
        if (!wishlist.some(item => item.product._id === product._id)) {
            wishlist.push({ product });
            localStorage.setItem(`wishlist-${user.id}`, JSON.stringify(wishlist));
            setIsAddedToWishlist(true);
        }
    };

    const removeFromWishlist = () => {
        if (!user) return;
        const storedWishlist = localStorage.getItem(`wishlist-${user.id}`);
        let wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
        wishlist = wishlist.filter(item => item.product._id !== product._id);
        localStorage.setItem(`wishlist-${user.id}`, JSON.stringify(wishlist));
        setIsAddedToWishlist(false);
    };

    if (loading) return <Loading />;
    if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center">
                <img src={product.image} alt={product.title} className="w-full sm:w-1/2 h-96 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6" />
                <div className="w-full sm:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-gray-600 mb-4">Category: {product.category}</p>
                    <p className="text-blue-600 font-bold mb-4 text-2xl">{product.price}€</p>
                    <p className="mb-4">{product.description}</p>
                    <button
                        onClick={isAddedToWishlist ? removeFromWishlist : addToWishlist}
                        className={`${isAddedToWishlist ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
                    >
                        {isAddedToWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// frontend/src/App.js
const App = () => {
    const [user, setUser] = useState(getUser());

    return (
        <div>
            <NavBar user={user} />
            <Router>
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/seller-dashboard" element={<SellerDashboard />} />
                    <Route
                        path="/add-product"
                        element={<ProtectedRoute user={user} allowedRoles={['seller','admin']}><AddProduct /></ProtectedRoute>}
                    />
                    {/* All other routes... */}
                </Routes>
            </Router>
        </div>
    );
};

// frontend/src/components/NavBar.jsx
const NavBar = ({ user }) => {
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItemCount(cart.length);
    }, []);

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            {/* NavBar JSX... */}
        </nav>
    );
};

// Single Export at the end
export { Wishlist, ProductDetails, App, NavBar };
export default App;