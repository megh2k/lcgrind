import { connectToDB } from "@/lib/mongodb";
import Group from "@/models/Group";
import User from "@/models/User";

export async function POST(request) {
  try {
    const { userId, groupId } = await request.json();

    if (!userId || !groupId) {
      return new Response(
        JSON.stringify({ error: "userId and groupId are required!" }),
        { status: 400 }
      );
    }

    await connectToDB();

    const [user, group] = await Promise.all([
      User.findById(userId),
      Group.findById(groupId),
    ]);

    if (!user || !group) {
      return new Response(
        JSON.stringify({ error: "user or group not found!" }),
        { status: 404 }
      );
    }

    if (user.groups.includes(groupId) || group.users.includes(userId)) {
      return new Response(JSON.stringify({ error: "User already in group" }), {
        status: 400,
      });
    } else {
      user.groups.push(groupId);
      group.users.push(userId);
    }

    await Promise.all([user.save(), group.save()]);

    return new Response(JSON.stringify({ user, group }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Failed to join group" }), {
      status: 500,
    });
  }
}
