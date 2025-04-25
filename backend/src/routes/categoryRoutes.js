const router = express.Router();

// Import the category controller
const categoryController = require('../controllers/categoryController');

// Define routes
router.post('/', categoryController.createCategory); // Create a new category
router.get('/', categoryController.getCategories); // Get all categories
router.get('/:id', categoryController.getCategoryById); // Get a specific category by ID
router.put('/:id', categoryController.updateCategory); // Update a category by ID
router.delete('/:id', categoryController.deleteCategory); // Delete a category by ID


module.exports = router;