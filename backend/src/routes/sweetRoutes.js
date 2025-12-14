const express = require('express');
const router = express.Router();
const sweetController = require('../controllers/sweetController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, sweetController.addSweet);
router.get('/', authMiddleware, sweetController.getAllSweets);
router.get('/search', authMiddleware, sweetController.searchSweets);
router.put('/:id', authMiddleware, sweetController.updateSweet);
router.delete('/:id', authMiddleware, adminMiddleware, sweetController.deleteSweet);
router.post('/:id/purchase', authMiddleware, sweetController.purchaseSweet);
router.post('/:id/restock', authMiddleware, adminMiddleware, sweetController.restockSweet);

module.exports = router;