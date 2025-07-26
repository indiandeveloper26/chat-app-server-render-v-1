// import express from 'express';
// import Crateuser from '../modal/saveuser.js'; // ✅ Tumhara Mongoose User Model
// import jwt from 'jsonwebtoken';


// const loginRoute = express.Router();

// // ✅ Login Endpoint
// loginRoute.post('/', async (req, res) => {
//   const { username, password } = req.body;

//   console.log('Login attempt:', username);

//   res.send("loging")

// //   if (!username || !password) {
// //     return res.status(400).json({ message: 'Username and password are required' });
// //   }

// //   try {
// //     // ✅ User find karo
// //     const user = await Crateuser.findOne({ username });
// //     if (!user) {
// //       return res.status(401).json({ message: 'Invalid username or password' });
// //     }

// //     // ✅ Password check karo
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(401).json({ message: 'Invalid username or password' });
// //     }

// //     // ✅ JWT banado
// //     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

// //     // ✅ Response bhejo
// //     res.json({
// //       user: {
// //         username: user.username,
// //         _id: user._id,
// //       },
// //       token,
// //     });

// //     console.log('Login success:', username);

// //   } catch (error) {
// //     console.error('Login error:', error.message);
// //     res.status(500).json({ message: 'Internal Server Error' });
// //   }
// });

// export default loginRoute;


















import express from 'express'
import Adduser from '../modal/adduser.js';




const infinite = express.Router();



 // ✅ Same JWT secret

infinite.post('/', async (req, res) => {


    // let user = await Adduser.find()

    // res.json(user)
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const users = await Adduser.find()
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit);

    const total = await Adduser.countDocuments();

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
      users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default infinite;
