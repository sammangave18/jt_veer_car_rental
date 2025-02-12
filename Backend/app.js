// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./db/db');

// // Import routes
// const employeeRoutes = require('./routes/employeeRoutes');
// const cityRoutes = require('./routes/cityRoutes');
// const tripRoutes = require('./routes/tripsRoutes');


// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Routes
// app.use('/api/employees', employeeRoutes); // Employee-related routes
// app.use('/api/cities', cityRoutes);       // City-related routes
// app.use('/api/trips', tripRoutes);       // Trips-related routes


// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./db/db');

// Import routes
const employeeRoutes = require('./routes/employeeRoutes');
const cityRoutes = require('./routes/cityRoutes');
const tripRoutes = require('./routes/tripsRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for serving uploaded files
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // Create directory if it doesn't exist
}
app.use('/uploads', express.static(uploadsDir)); // Serve uploaded files

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/employees', employeeRoutes); // Employee-related routes
app.use('/api/cities', cityRoutes);        // City-related routes
app.use('/api/trips', tripRoutes);         // Trips-related routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
