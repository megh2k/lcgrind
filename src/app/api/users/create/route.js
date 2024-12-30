import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
    try {
        const { username, email } = await request.json();

        if (!username || !email) {
            return new Response(JSON.stringify({ error: 'Username and Email are required' }), { status: 400 });
        }

        const newUser = new User({
            username,
            email,
        });

        await connectToDB();
        await newUser.save();

        return new Response(JSON.stringify({ success: true, user: newUser }), { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response(JSON.stringify({ error: error.message || 'Failed to create user' }), { status: 500 });
    }
}
