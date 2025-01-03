import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function getUserByEmail(email) {
    const db = await connectToDB();
    const user = await User.findOne({ email }).select('username');
    return user;
}

