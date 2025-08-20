import express from 'express'
import { aiComplete } from '../geminibot.js';




const airoute = express.Router();



















airoute.post('/', async (req, res) => {

    const {text}= req.body

    console.log('data',text)
 
 let dta=await aiComplete(text)
 console.log('data',dta)
   res.json({'dta':dta})
});



export default airoute