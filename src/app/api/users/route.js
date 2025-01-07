import { connectToDB } from '@/lib/mongodb';
import Users from '../../../models/User';

export async function GET() {
    try {  
        await connectToDB();
    }
    catch (error) {
        return new Response(JSON.stringify({ error: error.message || 'Failed to connect' }), { status: 500 });
    }

    try {
        const users = await Users.find();
        return new Response(JSON.stringify(users), { status: 200 });
    }
    catch (error) {
        return new Response(JSON.stringify({ error:error.message || "Failed to get all Users" }), { status: 500 });
    }
}
