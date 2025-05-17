
import express from 'express'
import Crateuser from '../modal/saveuser.js';


 export const serchroute = express.Router();

serchroute.post ("/",async(req,res)=>{

  let {username}=req.body

  console.log(username)
 try {
  //  const getuser=await Crateuser.findOne({username:req.body.username})



  const getuser = await Crateuser.findOne({
    username  : { $regex: ".*"+username+".*", $options: 'i' }, // 'i' for case-insensitive search
  });

   if (!getuser) {
   res.json({error:"usre not found"})
      
   }
   else{

    
   res.json({username:getuser.username})
   console.log(getuser.username)

   }
 } catch (error) {
   res.json({error:error})
 }


})



// Creates a new router instance  serchroute;  // Export the router
