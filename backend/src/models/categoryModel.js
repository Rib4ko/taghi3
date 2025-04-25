const connection = require('../config/db'); // Import the database connection

// Create a new category
const createCategory = async (category) => {
  try {
    const { name } = category; // Extract the name from the category object
    // Execute the SQL query to insert the new category into the database
    const [result] = await connection.execute('INSERT INTO categories (name) VALUES (?)', [name]);
    const newCategory = {
      id: result.insertId, // Get the auto-generated ID of the new category
      name, // Include the name in the new category object
    };
    return newCategory; // Return the newly created category object
  } catch (error) {
    console.error(error); // Log any errors to the console
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Get all categories
const getCategories = async () => {
  try {
    const [rows] = await connection.execute('SELECT * FROM categories'); // Execute the SQL query to select all categories
    return rows; // Return the list of categories
  } catch (error) {
    console.error(error); // Log any errors to the console
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Get a category by ID
const getCategoryById = async (id) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM categories WHERE id = ?', [id]); // Execute the SQL query to select a specific category by ID
    return rows[0]; // Return the category found or undefined if not found
  } catch (error) {
    console.error(error); // Log any errors to the console
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Update a category
const updateCategory = async (id, name) => {
    try {
        const [result] = await connection.execute('UPDATE categories SET name = ? WHERE id = ?', [name, id]); // Execute the SQL query to update a specific category by ID
        return {id, name}; // return the category updated
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Delete a category
const deleteCategory = async (id) => {
    try {
        const [result] = await connection.execute('DELETE FROM categories WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};