const express = require('express');
const connectDB = require('./db');
const Join = require('./models/join');
const cors = require('cors'); // Import cors

const app = express(); // Initialize the app here
const PORT = process.env.PORT || 5000;

// Use cors middleware with specific origin
app.use(cors({
    origin: 'http://localhost:3000', // Allow only requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly allow required methods
    credentials: true, // If you're using cookies or auth headers
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON data

// Routes

// Route to add a new entry (replaces JSON write operation)
app.post('/join', async (req, res) => {
    try {
      const newEntry = await Join.create(req.body);
      res.status(201).json({ success: true, data: newEntry });
    } catch (error) {
      console.error('Error creating entry:', error);
      res.status(500).json({ success: false, error: 'Failed to create entry' });
    }
  });
  

// Route to get all entries (replaces JSON read operation)
app.get('/join', async (req, res) => {
    try {
        const entries = await Join.find();
        res.json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch entries' });
    }
});

// Route to update an entry (if needed)
app.put('/join/:id', async (req, res) => {
    try {
        const updatedEntry = await Join.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEntry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update entry' });
    }
});

// Route to delete an entry (if needed)
app.delete('/join/:id', async (req, res) => {
    try {
        await Join.findByIdAndDelete(req.params.id);
        res.json({ message: 'Entry deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete entry' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
