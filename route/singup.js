
// // import express from 'express'
// // import Crateuser from '../modal/saveuser.js'
// // import jwt from 'jsonwebtoken';
// // import bcrypt from 'bcrypt'
// // const singupRoute = express.Router();


// // // singuproute.post('/',async(req,res)=>{

// // //     // console.log(req.body)
// // //     const {username,password}=req.body
// // //     if (!username || !password) {
// // //             return res.json({ message: 'Username and password are required' });
// // //          }
// // //          try {
// // //                 // Check if the username already exists
// // //                 const existingUser = await Crateuser.findOne({ username });
// // //                 if (existingUser) {
// // //                   console.log('user allready ')
// // //                  return res.json({ 'data': 'Username already taken' });
// // //                 }
            
// // //                 // Create a new user
// // //                 const crateuser= new Crateuser({ username, password })
// // //                 await crateuser.save()
// // //                    console.log('user',crateuser)
            
// // //                 const token = jwt.sign({ userId: crateuser._id}, JWT_SECRET, { expiresIn: '3333w' });
// // //                 res.json({crateuser,token})
// // //             console.log('token',token)
              
// // //               } catch (error) {
                
// // //               res.json({"error":error})
// // //               }
              
  


   
// // // })


// // // export default singuproute


// // const JWT_SECRET='KAJFSLJDIOFFMNASDIJ'

// // singupRoute.post('/', async (req, res) => {
// //     const { username, password } = req.body;

// //     console.log(username,password)
  
// //     if (!username || !password) {
// //       return res.status(400).json({ message: 'Username and password are required' });
// //     }
  
// //     try {
// //       // Check if the username already exists
// //       const existingUser = await Crateuser.findOne({ username });
// //       if (existingUser) {
// //         console.log('User already exists');
// //         return res.status(400).json({ message: 'Username already taken' });
// //       }
  
// //       // Hash the password
// //       const hashedPassword = await bcrypt.hash(password, 10);
  
// //       // Create a new user
// //       const crateuser = new Crateuser({ username, password: hashedPassword });
// //       await crateuser.save();
// //       console.log('User created:', crateuser);
  
// //       // Generate JWT Token
// //       const token = jwt.sign({ userId: crateuser._id }, JWT_SECRET, { expiresIn: '7d' });
  
// //       // Return username and token only
// //       res.json({
// //         user: {
// //           username: crateuser.username,
// //           _id: crateuser._id,
// //         },
// //         token,
// //       });
  
// //       console.log('Token:', token);
  
// //     } catch (error) {
// //       console.error('Signup error:', error.message);
// //       res.status(500).json({ message: 'Internal Server Error' });
// //     }

   
// //   });
  
// //   export default singupRoute














// import express from 'express';
// import Crateuser from '../modal/saveuser.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// const singupRoute = express.Router();
// const JWT_SECRET = 'KAJFSLJDIOFFMNASDIJ'; // ✅ Use env in real project

// singupRoute.post('/', async (req, res) => {
//   const { username, password } = req.body;

//   // 🛡️ Basic validation
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }

//   try {
//     // 🔍 Check if user already exists
//     const existingUser = await Crateuser.findOne({ username });
//     if (existingUser) {
//       return res.status(409).json({ message: 'Username already taken' });
//     }

//     // 🔒 Hash the password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // 📦 Save the user
//     const newUser = new Crateuser({ username, password: hashedPassword });
//     await newUser.save();
//     console.log('userdelat ',newUser)

//     // 🪙 Generate JWT
//     const token = jwt.sign(
//       { userId: newUser._id },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     // ✅ Return success
//     res.status(201).json({
//       user: {
//         _id: newUser._id,
//         username: newUser.username,
//       },
//       token,
//     });

//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// export default singupRoute;
















import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Crateuser from "../modal/saveuser.js";

const singupRoute = express.Router();

const JWT_SECRET = "YOUR_SECRET_KEY"; // 🔑 अपनी secret key सही से रखना

singupRoute.post('/', async (req, res) => {
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
      { expiresIn: '7d' } // 7 दिन बाद expire होगा
    );

    // ✅ Return success with JWT
    res.status(201).json({
      user: {
        _id: newUser._id,
        username: newUser.username,
        isPremium: newUser.isPremium,
        premiumExpiry: newUser.premiumExpiry,
      },
      token,
      message: 'Signup successful with 2 days premium!',
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default singupRoute;
