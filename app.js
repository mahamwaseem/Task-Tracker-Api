const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/tasks');

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Optional root route
app.get('/', (req, res) => {
  res.send('Task Tracker API is running');
});

module.exports = app;
