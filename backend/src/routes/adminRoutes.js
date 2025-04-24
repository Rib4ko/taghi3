const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/zakat', adminController.calculateZakat);
router.post('/zakat', adminController.createZakat);
router.get('/zakat/:id', adminController.getZakatById);
router.put('/zakat/:id', adminController.updateZakat);
router.delete('/zakat/:id', adminController.deleteZakat);


router.get('/statistics', adminController.getStatistics);
router.post('/statistics', adminController.createStatistic);
router.get('/statistics/:id', adminController.getStatisticById);
router.put('/statistics/:id', adminController.updateStatistic);
router.delete('/statistics/:id', adminController.deleteStatistic);


module.exports = router;