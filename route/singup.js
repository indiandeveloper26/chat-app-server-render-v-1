





import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Crateuser from "../modal/saveuser.js";

const signupRoute = express.Router();

const JWT_SECRET = "YOUR_SECRET_KEY"; // 🔑 अपनी secret key सुरक्षित रखें

signupRoute.post('/', async (req, res) => {
  const { username, password } = req.body;

  // 🛡️ Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // 🔍 Check if user already exists
    const existingUser = await Crateuser.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    // 🔒 Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 📅 Add 2 days premium
    const trialExpiry = new Date();
    trialExpiry.setDate(trialExpiry.getDate() + 2);

    // 📦 Save the user with 2 day premium
    const newUser = new Crateuser({
      username,
      password: hashedPassword,
      isPremium: true,
      premiumExpiry: trialExpiry,
    });
    await newUser.save();

    console.log('🎉 User created with 2 days premium:', newUser);

    // 🪙 Generate JWT
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ Set JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Dev mode → false
      sameSite: "Lax", // Dev friendly
      maxAge: 7 * 24 * 60 * 60 * 1000
    });



    // ✅ Return user info (without token in body)
    res.status(201).json({
      user: {
        _id: newUser._id,
        username: newUser.username,
        isPremium: newUser.isPremium,
        premiumExpiry: newUser.premiumExpiry,
      },
      message: 'Signup successful with 2 days premium!',
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default signupRoute;
