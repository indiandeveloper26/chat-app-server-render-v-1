
// routes/userRoutes.j
// 
// s
import express from 'express'
import Adduser from '../modal/adduser.js';
import Crateuser from '../modal/saveuser.js';
import jwt from 'jsonwebtoken';
// const bcrypt = require('bcrypt');
import bcrypt from "bcrypt"
const router = express.Router();  // Creates a new router instance
const JWT_SECRET = 'your_secret_key';
// Example route: Get all users
router.post('/', async (req, res) => {

 
try {
  
  const saveuser= await Saveuser({Namnum:req.body.Namnum})
  await saveuser.save()

       res.json({saveuser})


  console.log('first.',saveuser)

} catch (error) {
  res.json({error})
  console.log('eror',error)
}


        
         
       

       

});



// router.post('/singup', async (req, res) => {

 
// const {username,password}=req.body

// // console.log(username,password)
// // res.send("hello")

// // console.log('data',username,password)
// //   if (!username || !password) {
// //     return res.json({ message: 'Username and password are required' });
// //   }

// //   try {
// //     // Check if the username already exists
// //     const existingUser = await Crateuser.findOne({ username });
// //     if (existingUser) {
// //       console.log('user allready ')
// //      return res.json({ 'data': 'Username already taken' });
// //     }

// //     // Create a new user
// //     const crateuser= new Crateuser({ username, password })
// //     await crateuser.save()


// //     const token = jwt.sign({ userId: crateuser._id}, JWT_SECRET, { expiresIn: '3333w' });
// //     res.json({crateuser,token})
// // console.log(crateuser,token)
  
// //   } catch (error) {
    
// //   res.json({"error":error})
// //   }
  
          
           
         



  
//     // Basic validation to check if username and password are provided
//     if (!username || !password) {
//       return res.status(400).json({ message: 'Username and password are required' });
//     }
  
//     try {
//       // Check if the username already exists in the database
//       const existingUser = await Crateuser.findOne({ username });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Username already taken' });
//       }
  
//       // Hash the password before saving to the database
//       const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
  
//       // Create a new user object
//       const newUser = new Crateuser({
//         username,
//         password: hashedPassword,  // Save the hashed password
//       });
  
//       // Save the new user to the database
//       await newUser.save();
  
//       // Generate a JWT token for the newly created user
//       const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
  
//       // Send the response with the user and token
//       res.json({
//         user: {
//           username: newUser.username,
//           _id: newUser._id,
//         },
//         token,
//       });
//     } catch (error) {
//       console.error('Error during signup:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
         
  
  

  // router.post('/loging', async (req, res) => {

  //   const { username, password } = req.body;

  //   const user = await Crateuser.findOne({username});

  
   
    
        
              
  //     try {

  //       if (!user) {
  //         return res.send('user no tfound')
  //        }

  //        else{
  //        if (user.password==password) {
  //         return res.json({user,token})
  //        }
  //        }
      
  //     } catch (error) {
        
  //     }
      
             
    

      
  //     });

      router.post('/login', async (req, res) => {

        console.log(req.body)
        try {
            const { username, password } = req.body;
            const user = await Crateuser.findOne({ username });
            console.log('data',user)

            if (!user) {
                return res.json({ error: 'User not found' });
            }
    
            // Compare password
            
            if (!password===user.password) {
                return res.json({ error: 'Invalid credentials' });
            }
    
            // Generate JWT Token
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
            res.json({ message: 'Login successful',user, token });
        } catch (err) {
            res.json({ error: err.message });
        }
    });


//   router.post('/adduser',async(req,res)=>{



  

//     const {localusernam,adduser}=req.body

// console.log('data',"local",localusernam,"adduser",adduser)



//     const checkuser= await Adduser.findOne({adduser:"sonali"})

//     if (!checkuser) {

    
//        try {

   
//     const savenum=await Adduser({adduser:adduser})
//     await savenum.save()

  

//   const user = await Crateuser.findOne({username:localusernam});
//   user.addusername.push(savenum._id);
//   await user.save();
   
// console.log('add',user)
// res.json({"data":user})
// console.log(user)
//    } catch (error) {
//     console.log('error',error)
//     res.json(error)
//    }
//     }
//     else{
//       res.send('useradllready exit')
//     }

  
//   })
  

// Example route: Get a user by ID























// Example route: Create a new user
router.post('/add', async (req, res) => {

  

 
  //   // Now add the post to the user's posts array
  //   const user = await Crateuser.findOne({username:req.body.username});
    
  //    user.adduser.push(newPost._id)
  //    await user.save()

  //    const getuser= await Saveuser.findOne({username:req.body.username}).populate('adduser')
  //    res.json(getuser.adduser)
  //   // res.status(201).json({ message: 'Post created!', user });
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
});


router.post('/get',async(req,res)=>{

  try {
    const user = await Saveuser.findOne({username:"sonali"}).populate('adduser')
    res.json(user.adduser.adduser)
    console.log(user)
  } catch (error) {
    res.json({'dastsa':error})
  }


})



router.post('/alluser',async(req,res)=>{

// console.log('alluser0',req.body)


  const {username}=req.body


  try {
    const getuser = await Crateuser.findOne( {username:username} ).populate('addusername');
    
    // console.log('user',getuser)
   if (!getuser) {
    res.json({data:"userdata not found"})
   }
   else{
    res.json({datatt:getuser})
   }
} catch (error) {
    console.error('Error fetching user:', error);
    res.json({ error: error.message });
}

})

















// router.post('/adduser', async (req, res) => {
//   const { username, adduser } = req.body;

//   console.log('data', "local",username , "adduser", adduser);

//   try {
//     // Check if adduser already exists in Adduser collection
//     const checkuser = await Adduser.findOne({ adduser: adduser });

//     if (!checkuser) {
//       // If not exist, create new adduser document
//       const savenum = new Adduser({ adduser: adduser });
//       await savenum.save();

//       // Find the user by username (localusernam) and add the saved adduser's _id
//       const user = await Crateuser.findOne({ username: username });

//       if (!user) {
//         return res.status(404).json({ error: "Local user not found" });
//       }

//       user.addusername.push(savenum._id);
//       await user.save();

//       console.log('add', user);
//       return res.json({ success: true, data: user });
//     } else {
//       return res.json({ success: false, message: 'User already exists in chat list' });
//     }
//   } catch (error) {
//     console.log('error', error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// });














router.post('/adduser', async (req, res) => {
  const { username, adduser } = req.body;

  console.log('Request:', { username, adduser });

  try {
    // Step 1: Check if adduser exists in Adduser collection
    let existingAddUser = await Adduser.findOne({ adduser });

    // Step 2: If not, create new Adduser
    if (!existingAddUser) {
      existingAddUser = new Adduser({ adduser });
      await existingAddUser.save();
    }

    // Step 3: Find the local user
    const localUser = await Crateuser.findOne({ username :username });

    if (!localUser) {
      return res.status(404).json({ error: "Local user not found" });
    }

    // Step 4: Check if already added
    const alreadyExists = localUser.addusername.includes(existingAddUser._id);
    if (alreadyExists) {
      
      console.log('user allread ')
      return res.status(400).json({ success: false, message: 'User already in chat list' });

    }

    // Step 5: Add reference
    localUser.addusername.push(existingAddUser._id);
    await localUser.save();

    // Step 6: Populate the added user list if needed
    const populatedUser = await Crateuser.findOne({ username }).populate('addusername');

    return res.json({ success: true, data: populatedUser });
  } catch (error) {
    console.error('Error adding user:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});





export default  router;  // Export the router
