
import express from 'express'
import Crateuser from '../modal/saveuser.js'


const routert = express.Router();


routert.get('/',async(req,res)=>{


 let data= await Crateuser.find()

   res.json({"data":data})
})


export default routert

