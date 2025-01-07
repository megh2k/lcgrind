import { connectToDB } from '@/lib/mongodb';
import Group from '../../../models/Group'

export async function GET() {
    try {  
        await connectToDB();
    }
    catch (error) {
        return new Response(JSON.stringify({ error: error.message || 'Failed to connect' }), { status: 500 });
    }

    try {
        const groups = await Group.find();
        return new Response(JSON.stringify(groups), { status: 200 });
    }

    catch (error) {
        return new Response(JSON.stringify({ error: error.message || 'Failed to fetch groups' }), { status: 500 });
    }

}