import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/user";
import { getCartItemsCount } from "../utils/cart";

const NavBar = ({ user, setUser }) => {
    const navigate = useNavigate();
    
    const cartItemsCount = getCartItemsCount();
    let cartDisplay = "Cart";
    if(cartItemsCount > 0)
    {
        cartDisplay = "Cart (" + cartItemsCount + ")";
    }
    
    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className="bg-blue-900 text-white py-4 px-4 sm:px-6">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <NavLink to="/" className="text-white font-bold text-xl mb-4 sm:mb-0">
                    JiexTrading
                </NavLink>
                <ul className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
                   <li><NavLink to="/" className="bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded">Home</NavLink></li>
                    <li><NavLink to="/products" className="bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded">Products</NavLink></li>
                    
                    {user && user.role === "admin" && (
                        <>
                            <li>
                                <NavLink to="/cart" className="bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded">
                                {cartDisplay}
                                </NavLink>
                            </li>
                            <li>
                            <NavLink to="/admin/manage-categories" className="bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded">
                                Manage Categories
                                </NavLink>
                            </li>
                        </>
                    )}
                    {user && (user.role === 'seller' || user.role === 'admin') && (
                        <li>
                            <NavLink to="/seller-orders" className="bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded">
                                Orders
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink to="/order-history" className="bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded">My Orders</NavLink>
                        </li>
                    )}
                     {user && (
                            <li>
                                <NavLink to="/wishlist" className="bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded">Wishlist</NavLink>
                            </li>
                        )}
                    {user && (
                        <li>
                            <NavLink to="/profile" className="bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded">Profile</NavLink>
                        </li>
                    )}
                    {user ? (
                        <li>
                            <button onClick={handleLogout} className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded">
                                Logout
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login" className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded">
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/register" className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded">
                                    Register
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;