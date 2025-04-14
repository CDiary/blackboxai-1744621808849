const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express(); 
const morgan = require('morgan'); // Import morgan for logging

// Use morgan to log requests to the console
app.use(morgan('dev')); // Log requests in 'dev' format
const port = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the src/pages directory
app.use(express.static(path.join(__dirname, 'src', 'pages')));

// Serve video and image files
app.use('/assets', express.static(path.join(__dirname, 'src', 'pages', 'assets')));

// Serve files from src/database with proper headers
app.use('/database', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}, express.static(path.join(__dirname, 'src', 'database')));

// Route to save users
app.post('/save-users', (req, res) => {
    const usersPath = path.join(__dirname, 'src', 'database', 'users.json');
    fs.writeFileSync(usersPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
});

// Route to save records
app.post('/save-records', (req, res) => {
    const recordsPath = path.join(__dirname, 'src', 'database', 'records.json');
    fs.writeFileSync(recordsPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
});

// Redirect root to login page
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
    console.log(`Open your browser and navigate to http://localhost:${port}`);
});
