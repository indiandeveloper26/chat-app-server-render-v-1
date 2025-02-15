
// routes/userRoutes.j
// 
// s
import express from 'express'
import Saveuser from '../modal/crateuser.js';
import Adduser from '../modal/adduser.js';


const router = express.Router();  // Creates a new router instance

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


export default  router;  // Export the router
