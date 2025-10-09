



// ✅ Add User to Group
export const addusergroup = async (req, res) => {

    // res.send("Addgrpu")


    try {
        const { groupId, username } = req.body;

        if (!groupId || !username) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        // 1️⃣ Check if group exists
        const group = await Group.findOne({ name: groupId });
        if (!group) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }

        // 2️⃣ Check if user exists
        const user = await Crateuser.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 3️⃣ Check if user already in group
        if (group.usersgroup.includes(user._id)) {
            return res.json({ success: false, message: "User already in group" });
        }

        // 4️⃣ Add user to group
        group.members.push(user._id);
        await group.save();

        // 5️⃣ Update user's group array
        await Crateuser.updateOne(
            { _id: user._id },
            { $addToSet: { grouparr: group._id } }
        );

        res.json({ success: true, message: "User added to group" });
    } catch (err) {
        console.error("Error adding user:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}





