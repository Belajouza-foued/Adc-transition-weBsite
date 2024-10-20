const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON requests
app.use(cors()); // To enable cross-origin requests
app.use('/uploads', express.static('uploads')); // Serve uploaded images statically

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/adcwebsite', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// add frontend et backend au adc website//
