const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Create Task (POST /tasks)
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = new Task({ title, description });
    task.status = 'Created';
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
//Delete Task
  router.delete('/:taskID', async (req, res) => {
  try {
    const { taskID } = req.params;

    const task = await Task.findOne({ taskId: taskID });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    task.status = 'Deleted'; 
    await task.save(); 

    await task.deleteOne();

    res.json({ message: 'Task deleted successfully', deletedTask: task});
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});   

// Update Task (PUT /tasks/:taskId)
router.put('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description } = req.body;

    const task = await Task.findOne({ taskId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (title) task.title = title;
    if (description) task.description = description;
    
    task.status = 'Updated'; 
    await task.save();

    res.json({ message: 'Task updated successfully', task });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Submit Task (POST /tasks/:taskId/submit)
router.post('/:taskId/submit', async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findOne({ taskId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = 'Completed';
    await task.save();

    res.json({ message: 'Task marked as completed', task });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get All Tasks (GET /tasks)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get Task by ID (GET /tasks/:taskId)
router.get('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findOne({ taskId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ task });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;