import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  Number: { type: Number, required: true },

  // This field references the Post model
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: '' }]
});

const User = mongoose.model('User', UserSchema);




const PostSchema = new mongoose.Schema({
    addnum: { type: Number, required: true },

    // This field references the User model
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Saveuser' }
  });
  
  const Adduser = mongoose.model('Adduser', PostSchema);

  export default Adduser