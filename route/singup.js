
import express from 'express'
import Crateuser from '../modal/saveuser.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const singupRoute = express.Router();


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


const JWT_SECRET='KAJFSLJDIOFFMNASDIJ'

singupRoute.post('/', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      // Check if the username already exists
      const existingUser = await Crateuser.findOne({ username });
      if (existingUser) {
        console.log('User already exists');
        return res.status(400).json({ message: 'Username already taken' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const crateuser = new Crateuser({ username, password: hashedPassword });
      await crateuser.save();
      console.log('User created:', crateuser);
  
      // Generate JWT Token
      const token = jwt.sign({ userId: crateuser._id }, JWT_SECRET, { expiresIn: '7d' });
  
      // Return username and token only
      res.json({
        user: {
          username: crateuser.username,
          _id: crateuser._id,
        },
        token,
      });
  
      console.log('Token:', token);
  
    } catch (error) {
      console.error('Signup error:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  export default singupRoute