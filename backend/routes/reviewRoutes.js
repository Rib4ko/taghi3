const express = require('express');
    const router = express.Router();
    const reviewController = require('../controllers/reviewController');
    
    router.post('/api/reviews', reviewController.createReview);
    
    module.exports = router;