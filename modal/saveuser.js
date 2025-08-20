import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true, // Username must be unique
    },
  isPremium: { type: Boolean, default: false },
  premiumExpiry: { type: Date, default: null },
    password: {
      type: String,
      required: true,
    },
     addusername: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Adduser' }]
  });

  const Crateuser  = mongoose.model('Crateuser', userSchema);
  
  export default Crateuser