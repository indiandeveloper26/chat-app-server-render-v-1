import mongoose from "mongoose";






const PostSchema = new mongoose.Schema({
    adduser: { type: String, required: true, },

    // This field references the User model
   
  });
  
  const Adduser = mongoose.model('Adduser', PostSchema);

  export default Adduser