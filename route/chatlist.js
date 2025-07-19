
import express from 'express'

const chatlapi = express.Router();

   



chatlapi.post('/', async (req, res) => {
    const { username, password } = req.body;

    console.log(username,password)
  



  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    // Get all users except the current one
    const users = await Crateuser.find({ username: username  });

    // const result = users.map(user => ({
    //   username: user.username,
    //   id: user._id,
      
    // }));
 
    console.log('chatlist',users)
    res.json({ users: result });
  } catch (err) {
    console.error('Error in chatlist:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
   
  });
  
  export default chatlapi