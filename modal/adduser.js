import mongoose from "mongoose";






const PostSchema = new mongoose.Schema({
    addnum: { type: Number, required: true, },

    // This field references the User model
   
  });
  
  const Adduser = mongoose.model('Adduser', PostSchema);

  export default Adduser