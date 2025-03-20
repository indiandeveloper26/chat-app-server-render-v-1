
// routes/userRoutes.j
// 
// s
import express from 'express'
import Adduser from '../modal/adduser.js';
import Crateuser from '../modal/saveuser.js';
import jwt from 'jsonwebtoken';

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



router.post('/singup', async (req, res) => {

 
const {username,password}=req.body

// console.log('data',username,password)
  if (!username || !password) {
    return res.json({ message: 'Username and password are required' });
  }

  try {
    // Check if the username already exists
    const existingUser = await Crateuser.findOne({ username });
    if (existingUser) {
      console.log('user allready ')
     return  res.json({ 'data': 'Username already taken' });
    }

    // Create a new user
    const crateuser= new Crateuser({ username, password })
    await crateuser.save()


    const token = jwt.sign({ userId: crateuser._id}, JWT_SECRET, { expiresIn: '3333w' });
    res.json({'datasave':crateuser,token})

  
  } catch (error) {
    
  res.json({"error":error})
  }
  
          
           
         

         
  
  });

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


  router.post('/adduser',async(req,res)=>{

    const {email,number}=req.body


    console.log(email,number)

   try {
    const savenum=await Adduser({addnum:number})
    await savenum.save()

    await Crateuser.updateOne({
    username:email
   },
    
    { $push: { adduser: savenum._id } });

res.json({"data":Crateuser})
   } catch (error) {
    console.log('error',error)
   }
  })
  

// Example route: Get a user by ID























// Example route: Create a new user
router.post('/add', async (req, res) => {

  

  try {

    const newPost = new Adduser({
     
      addnum: req.body.adduser, // Reference to the user
    });
     await newPost.save()


 
    // Now add the post to the user's posts array
    const user = await Saveuser.findOne({Namnum:req.body.Namnum});
    
     user.adduser.push(newPost._id)
     await user.save()

     const getuser= await Saveuser.findOne({Namnum:req.body.Namnum}).populate('adduser')
     res.json(getuser.adduser)
    // res.status(201).json({ message: 'Post created!', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/get',async(req,res)=>{

  try {
    const user = await Saveuser.findOne({Namnum:req.body.Namnum}).populate('adduser')
    res.json({user})
    console.log(user)
  } catch (error) {
    res.json({'dastsa':error})
  }


})



router.post('/alluser',async(req,res)=>{

  try {
    const getuser = await Crateuser.findOne( {username:'sahilindia12'} ).populate('adduser');
    console.log(getuser);
    
    res.json(getuser.adduser);
} catch (error) {
    console.error('Error fetching user:', error);
    res.json({ error: error.message });
}

})


export default  router;  // Export the router
