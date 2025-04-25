import React, { useState, useContext } from 'react';import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/user';
import { AuthContext } from '../context/AuthContext';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
      const response = await login(email, password);
      if(!response.token) throw new Error("Response missing token");
      Cookies.set('token', response.token);
      return response;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await login(email, password);
            localStorage.setItem('user', JSON.stringify(data.user));
            console.log('Login successful:', data);
            setUser(data.user);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <div>
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-6">
                        Login
                    </h1>
                    {loading && <div className="text-center">Loading...</div>}
                    {error && <div className="text-red-500 text-center">{error}</div>}
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6" >
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                
                <div className="mt-4 text-center">
                    <Link to="/register" className="text-blue-500 hover:underline">Don't have an account? Register</Link>
                </div>
            
                </form></div>
                <button
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    Login
                </button>
        
        </div>
    );
};

export default Login;