const express = require('express');
const taskController = require('../controllers/taskController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/', authenticate, taskController.createTask);
router.get('/', authenticate, taskController.getTasks);
router.put('/:id', authenticate, taskController.updateTask);
router.delete('/:id', authenticate, taskController.deleteTask);

module.exports = router;