const mongoose = require('mongoose');  // Add this line to require mongoose
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
