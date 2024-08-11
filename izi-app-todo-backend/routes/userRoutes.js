const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.get('/', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;