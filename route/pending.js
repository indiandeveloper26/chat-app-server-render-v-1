import express from 'express';
import PendingMessage from '../models/PendingMessage.js';

const routerpend = express.Router();

// ✅ pendingMessages.js
import express from 'express';


const router = express.Router();

router.get('/', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const pending = await PendingMessage.find({ to: username });
    res.json(pending);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;

