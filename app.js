const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/tasktracker')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/tasks', taskRoutes);

// Server start
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)
);