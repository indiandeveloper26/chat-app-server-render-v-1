import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdBy: { type: String, required: true },
    usersgroup: [{

        name: String,
        joinedAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Group = mongoose.model("Group", groupSchema);
export default Group;