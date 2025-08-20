import express from 'express';
import Crateuser from '../modal/saveuser.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginRoute = express.Router();
const JWT_SECRET = 'KAJFSLJDIOFFMNASDIJ'; // ✅ Use .env in real project

loginRoute.post('/', async (req, res) => {
  const { username, password } = req.body;

  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // 🔍 Find the user
    const existingUser = await Crateuser.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // ✅ Compare hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 🪙 Generate JWT
    const token = jwt.sign(
      { userId: existingUser._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ Return success
    res.status(200).json({
      user: {
        _id: existingUser._id,
        username: existingUser.username,
      },
      token,
      userdata:existingUser
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default loginRoute;
