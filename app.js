const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// routes importing
const authRoute = require('./routes/authRoute');


// config dotenv
dotenv.config();

// Init app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get('/', async (req, res) => {
    res.send("this e-commerce server is running");
})

// Use Routes
app.use('/api/user', authRoute);

// Export app
module.exports = app;
