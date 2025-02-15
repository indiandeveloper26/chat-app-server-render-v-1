// Import express
import express from 'express';  // Use ES6 import syntax (if "type": "module" is set in package.json)

const app = express(); // Create an instance of an Express application

// Middleware: This is used to parse incoming request bodies in JSON format
app.use(express.json());

// Define a basic GET route (root route)
app.get('/', (req, res) => {
    res.send('Hello, welcome to my Express app!');
});

// Define another route: GET /about
app.get('/about', (req, res) => {
    res.send('This is the About page');
});

// Define a POST route (e.g., for creating a new resource)
app.post('/create', (req, res) => {
    const data = req.body;  // Data sent in the request body
    res.status(201).send({
        message: 'New resource created successfully!',
        data: data
    });
});

// Start the server and listen for requests on port 3000
app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
