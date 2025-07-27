import express from 'express';
import PendingMessage from '../models/PendingMessage.js';

const routerpend = express.Router();

// Get all pending messages for a user
routerpend.get('/', async (req, res) => {
  const { username } = req.query;

  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const messages = await PendingMessage.find({ to: username });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch pending messages' });
  }
});

export default routerpend;
