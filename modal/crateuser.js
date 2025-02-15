import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  Namnum: { type: Number, required: true ,unique: true},

  // This field references the Post model
  adduser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Adduser' }]
});

const Saveuser = mongoose.model('Saveuser', UserSchema);

export default Saveuser