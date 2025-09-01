// Import required packages
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

// Initialize express app
const app = express();

// Connect to Database
connectDB();

// Initialize Middleware
// This allows us to accept JSON data in the body of requests
app.use(express.json({ extended: false }));

// Define API Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/requests', require('./routes/api/requests'));
app.use('/api/gallery', require('./routes/api/gallery'));

// Serve static assets in production
// This will serve the frontend files (index.html, admin panel, etc.)
app.use(express.static('public'));

// For any route that is not an API route, send the index.html file
// This is important for single-page applications and client-side routing
app.get('*', (req, res) => {
    // Check if the request is for an admin page
    if (req.originalUrl.startsWith('/admin')) {
        // Let the static server handle it or send a specific admin file if needed
        // The express.static middleware should handle this. If it doesn't find a file, it will proceed.
        // We can send the login page as a fallback for any unknown admin route.
        res.sendFile(path.resolve(__dirname, 'public', 'admin', 'login.html'));
    } else {
        // For all other routes, send the main website's index.html
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    }
});


// Define the port to run on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));