import { auth, signOut } from "@/auth";

export async function POST(request) {
    
    try {
        await signOut();
        return new Response(JSON.stringify({ success: true}), { status: 200 });
    }
    catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: error.message || 'Failed to sign user out' }), { status: 500 });
    }
    
}