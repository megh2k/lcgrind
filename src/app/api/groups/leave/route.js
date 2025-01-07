import { connectToDB } from '@/lib/mongodb';
import Group from '@/models/Group';
import User from '@/models/User';

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { userId, groupId } = requestBody;

        await connectToDB();

        const group = await Group.findById(groupId);
        const user = await User.findById(userId);

        group.users = group.users.filter(item => item != userId);
        user.groups = user.groups.filter(item => item != groupId);

        await group.save();
        await user.save();

        return new Response(JSON.stringify({ success: true, groupUsers: group.users, userGroups: user.groups}), { status: 200 });
    }
    catch (error) {
        return new Response(JSON.stringify({ error: error.message || 'Failed to leave user' }), { status: 500 });
    }
}