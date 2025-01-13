import { connectToDB } from "@/lib/mongodb";
import Group from "@/models/Group";
import User from "@/models/User";

export async function POST(request, { params }) {
  try {
    const slug = (await params).slug;

    const [creatorId, userId, groupId, action] = slug;
    await connectToDB();

    const creator = await User.findById(creatorId);
    const requestedUser = await User.findById(userId);
    const group = await Group.findById(groupId);

    if (!creator || !requestedUser || !group) {
      return new Response(
        JSON.stringify({ error: "creator or user or group not found!" }),
        { status: 404 }
      );
    }

    // update requests for both creator and user

    creator.requests = creator.requests.filter(
      (item) => !(item.userId.equals(userId) && item.groupId.equals(groupId))
    );

    requestedUser.requests = requestedUser.requests.filter(
      (item) => !(item.userId.equals(userId) && item.groupId.equals(groupId))
    );

    // if action === accept => add user to group, else do nothing
    if (action === "accept") {
      requestedUser.groups.push(groupId);
      group.users.push(userId);
    }

    await Promise.all([creator.save(), requestedUser.save(), group.save()]);

    return new Response(
      JSON.stringify({ "Request changes made": requestedUser }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to take action on user request",
      }),
      {
        status: 500,
      }
    );
  }
}
