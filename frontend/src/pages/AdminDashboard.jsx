jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMe } from '../api/auth';
import Loading from '../components/Loading';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                const userData = await getMe(token);
                setUser(userData);
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    return (
        <div className="container mx-auto px-4 py-12 text-center">
            {loading && <Loading />}
            <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
            {user && (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
            <Link to="/create-seller" className="text-primary hover:underline">
                create new seller account
            </Link>
            
        </div>
    );
};

export default AdminDashboard;