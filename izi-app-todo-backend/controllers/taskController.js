const { Task } = require('../models');

exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      isCompleted: false,
      userId: req.userId,
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Error creating task' });
  }

};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.userId } });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;

  try {
    const task = await Task.findOne({ where: { id, userId: req.userId } });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title;
    task.description = description;
    task.isCompleted = isCompleted;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ where: { id, userId: req.userId } });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
};