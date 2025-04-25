import React, { useState, useEffect } from 'react';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../api/category';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editCategory, setEditCategory] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        try {
            await createCategory({ name: newCategoryName });
            setNewCategoryName('');
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleEditCategory = (category) => {
        setEditCategory(category);
        setEditCategoryName(category.name);
    };

    const handleUpdateCategory = async () => {
        try {
            await updateCategory(editCategory._id, { name: editCategoryName });
            setEditCategory(null);
            setEditCategoryName('');
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
            {loading && <Loading />}

            {/* Add Category */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Add Category</h2>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Category Name"
                        className="w-full p-2 border rounded-md mr-2"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAddCategory}
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Edit Category */}
            {editCategory && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Edit Category</h2>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Category Name"
                            className="w-full p-2 border rounded-md mr-2"
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                        />
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleUpdateCategory}
                        >
                            Update
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                            onClick={() => setEditCategory(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Categories List */}
            <h2 className="text-xl font-semibold mb-2">Categories List</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category._id} className="flex justify-between items-center py-2 border-b">
                        {category.name}
                        <div className="flex">
                            <button
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => handleEditCategory(category)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleDeleteCategory(category._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCategories;