
import express from 'express'
import Adduser from '../modal/adduser.js';



const derouter = express.Router();




derouter.post("/",async(req,res)=>{

console.log(req.body)

    try {
        const user = await Adduser.findByIdAndDelete(req.body.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})









export default derouter