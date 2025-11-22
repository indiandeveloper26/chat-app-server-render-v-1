

// ✅ Create new group
// export const createGroup = async (req, res) => {
//     res.send("This is creating group");
// };

import Group from "../modal/groupmodle.js";
import Crateuser from "../modal/saveuser.js";







// ✅ Create new group



export const createGroup = async (req, res) => {
    try {
        const { name, userIds, creatorId } = req.body;
        console.log(name, userIds, creatorId)
        if (!name || !creatorId || !userIds) {
            return res.status(400).json({ message: "All fields required" });
        }

        const idsArray = Array.isArray(userIds) ? userIds : [userIds];

        // Initial users array (creator + other users)
        const usersgroup = [
            { name: creatorId }, // creator
            ...idsArray.map((u) => ({ name: u })) // other users
        ];

        const group = new Group({
            name,
            createdBy: creatorId,
            usersgroup
        });

        await group.save();

        const updatedUser = await Crateuser.findOneAndUpdate(
            { username: creatorId },
            { $push: { grouparr: group._id } },
            { new: true } // ye updated document return karega
        );

        console.log(updatedUser)

        // { $push: { grouparr: group._id } }

        res.status(201).json({ message: "Group created", group, });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};



















export const usergrouplist = async (req, res) => {

    // res.send("usergruplsit")


    const { username } = req.body;
    if (!username) return res.status(400).json({ message: "Username required" });

    try {
        const userWithGroups = await Crateuser.findOne({ username: username })
            .populate({
                path: "grouparr",            // user ke groups
                populate: { path: "name", select: "username email" } // har group ke users ka detail
            });
        res.status(200).json({ userWithGroups });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}









// // ✅ Get all groups for a user
// exports.getUserGroups = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const groups = await Group.find({ users: userId }).populate("users", "username");
//         res.status(200).json(groups);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ✅ Add user to a group
// exports.addUserToGroup = async (req, res) => {
//     try {
//         const { groupId, userId } = req.body;

//         const group = await Group.findById(groupId);
//         if (!group) return res.status(404).json({ message: "Group not found" });

//         if (!group.users.includes(userId)) {
//             group.users.push(userId);
//             await group.save();
//         }

//         res.status(200).json({ message: "User added", group });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ✅ Remove user from a group
// exports.removeUserFromGroup = async (req, res) => {
//     try {
//         const { groupId, userId } = req.body;

//         const group = await Group.findById(groupId);
//         if (!group) return res.status(404).json({ message: "Group not found" });

//         group.users = group.users.filter((u) => u.toString() !== userId);
//         await group.save();

//         res.status(200).json({ message: "User removed", group });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ✅ Add message to group
// exports.addGroupMessage = async (req, res) => {
//     try {
//         const { groupId, senderId, message, type } = req.body;

//         const group = await Group.findById(groupId);
//         if (!group) return res.status(404).json({ message: "Group not found" });

//         group.messages.push({
//             sender: senderId,
//             message,
//             type: type || "text",
//         });

//         await group.save();

//         res.status(200).json({ message: "Message added", group });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ✅ Get group messages
// exports.getGroupMessages = async (req, res) => {
//     try {
//         const { groupId } = req.params;

//         const group = await Group.findById(groupId)
//             .populate("messages.sender", "username")
//             .populate("users", "username");

//         if (!group) return res.status(404).json({ message: "Group not found" });

//         res.status(200).json(group.messages);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };
