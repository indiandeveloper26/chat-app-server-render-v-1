
import express from 'express'
import Crateuser from '../modal/saveuser.js';



const routeget = express.Router();

routeget.post('/',async(req,res)=>{

    let userget= await Crateuser.findOne({username:"duggu"})
    res.json({"data":userget})
  
})


export default routeget