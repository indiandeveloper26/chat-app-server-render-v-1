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



// singuproute.post('/',async(req,res)=>{

//     // console.log(req.body)
//     const {username,password}=req.body
//     if (!username || !password) {
//             return res.json({ message: 'Username and password are required' });
//          }
//          try {
//                 // Check if the username already exists
//                 const existingUser = await Crateuser.findOne({ username });
//                 if (existingUser) {
//                   console.log('user allready ')
//                  return res.json({ 'data': 'Username already taken' });
//                 }
            
//                 // Create a new user
//                 const crateuser= new Crateuser({ username, password })
//                 await crateuser.save()
//                    console.log('user',crateuser)
            
//                 const token = jwt.sign({ userId: crateuser._id}, JWT_SECRET, { expiresIn: '3333w' });
//                 res.json({crateuser,token})
//             console.log('token',token)
              
//               } catch (error) {
                
//               res.json({"error":error})
//               }
              
  


   
// })


// export default singuproute


import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Crateuser from '../modal/saveuser.js';


const JWT_SECRET = 'KAJFSLJDIOFFMNASDIJ'; // ✅ Same as signup mein



const log = express.Router();



 // ✅ Same JWT secret

log.post('/', async (req, res) => {
  const { username, password } = req.body;

  console.log('Login attempt:', username);

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // ✅ User find karo
    const user = await Crateuser.findOne({ username});
   
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // ✅ Plain password match karo
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // ✅ JWT banado
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // ✅ Response bhejo
    res.json({
      user: {
        username: user.username,
        _id: user._id,
      },
      token,
    });

    console.log('Login success:');

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default log;
