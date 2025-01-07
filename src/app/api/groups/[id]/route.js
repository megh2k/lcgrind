import { connectToDB } from '@/lib/mongodb';
import Group from '@/models/Group';

export async function GET(_request, { params }) {
    const { id } = await params;
    try {
        await connectToDB();

        const group = await Group.findById(id);

        if (!group) {
            return new Response(JSON.stringify({ error: "Group does not exist" }), { status: 404 });
        }

        return new Response(JSON.stringify(group), { status: 200 });
    }
    catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch group data' }), { status: 500 });
    }

}