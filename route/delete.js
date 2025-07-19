import express from 'express'
import Adduser from '../modal/adduser.js';



const routedlt = express.Router();

// routedlt.delete('/',async(req,res)=>{

//     let {_id}=req.body

//     res.send("hii")

//     console.log(_id)

// //  try {
   

// //     // `_id` se user delete karo
// //     const result = await Adduser.findByIdAndDelete(id);

// //     if (!result) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     res.json({ message: 'User deleted successfully' });
// //   } catch (error) {
// //     console.error('Error deleting user:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// })


















routedlt.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // MongoDB _id ke hisaab se delete karo
    const result = await Adduser.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



export default routedlt