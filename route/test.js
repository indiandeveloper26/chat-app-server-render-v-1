
import express from 'express'



const routert = express.Router();


routert.post('/',(req,res)=>{
    res.json([
        {
          "_id": "639283",
          "addnum": 639283179899,
          "__v": 0
        },
        {
          "_id": "67d99d783954a926235bf32b",
          "addnum": 639283179899,
          "__v": 0
        },
        {
          "_id": "67d99d9dcd002b3eb2e12206",
          "addnum": 639283179899,
          "__v": 0
        },
        {
          "_id": "67d99dd2cd002b3eb2e12209",
          "addnum": 639283179899,
          "__v": 0
        },
        {
          "_id": "67d99eb3402b399c38ee7752",
          "addnum": 639283177850,
          "__v": 0
        }
      ])
})


export default routert

