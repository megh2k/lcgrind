import { connectToDB } from '@/lib/mongodb';
import Group from '@/models/Group'

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { name } = requestBody;

        if (!name) {
            return new Response(JSON.stringify({ error: 'Group name is required' }), { status: 400 });
        }

        await connectToDB();

        const newGroup = new Group({
            name,
        });

        await newGroup.save();

        return new Response(JSON.stringify({ success: true, group: newGroup }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message || 'Failed to create group' }), { status: 500 });
    }
}
