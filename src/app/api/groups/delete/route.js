import { connectToDB } from '@/lib/mongodb';
import Group from '@/models/Group';
import User from '@/models/User';

export async function DELETE(request) {
    try {
        const { userId, groupId } = await request.json();

        await connectToDB();

        const group = await Group.findById(groupId);
        if (!group) {
            return new Response(JSON.stringify({ error: "Group not found" }), { status: 404 });
        }

        if (group.creator.toString() !== userId) {
            return new Response(JSON.stringify({ error: "User not authorized to delete the group" }), { status: 403 });
        }

        // Remove groupId from each user’s 'groups' field
        await User.updateMany(
            { _id: { $in: group.users } },
            { $pull: { groups: groupId } }
        );

        // Delete the group from the database
        await Group.findByIdAndDelete(groupId);

        return new Response(JSON.stringify({ success: true, message: "Group deleted successfully" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message || "Failed to delete group" }), { status: 500 });
    }
}
