import { connectToDB } from '@/lib/mongodb';
import Group from '@/models/Group';
import User from '@/models/User';

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { name, creatorId, description } = requestBody;

        if (!name) {
            return new Response(JSON.stringify({ error: 'Group name is required' }), { status: 400 });
        }

        if (!creatorId) {
            return new Response(JSON.stringify({ error: 'Creator ID is required' }), { status: 400 });
        }

        const creator = await User.findById(creatorId);
        if (!creator) {
            return new Response(JSON.stringify({ error: 'Creator does not exist' }), { status: 404 });
        }

        await connectToDB();

        const newGroup = new Group({
            name,
            creator: creatorId,
            description: description || '',
            users: [creatorId],
        });

        await newGroup.save();

        creator.groups.push(newGroup._id);
        await creator.save();

        return new Response(JSON.stringify({ success: true, group: newGroup }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message || 'Failed to create group' }), { status: 500 });
    }
}
