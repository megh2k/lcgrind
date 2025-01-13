import { connectToDB } from "@/lib/mongodb";
import Group from "@/models/Group";
import User from "@/models/User";

export async function POST(request) {
  try {
    const { formData, groupId, creatorId, userId } = await request.json();
    if (!formData) {
      return new Response(
        JSON.stringify({
          error: "form Data is required!",
        }),
        { status: 400 }
      );
    }
    if (!userId || !groupId || !creatorId) {
      return new Response(
        JSON.stringify({
          error: "groupId, creatorId and userId are required!",
        }),
        { status: 400 }
      );
    }

    await connectToDB();

    const [group, creator, user] = await Promise.all([
      Group.findById(groupId),
      User.findById(creatorId),
      User.findById(userId),
    ]);

    if (!user || !group || !creator) {
      return new Response(
        JSON.stringify({ error: "user or group or creator not found!" }),
        { status: 404 }
      );
    }

    const objectExists = creator.requests.some(
      (item) => item.userId.equals(userId) && item.groupId.equals(groupId)
    );

    if (objectExists) {
      return new Response(JSON.stringify({ error: "Request already made" }), {
        status: 400,
      });
    } else {

      // creatorId gets a request from userId
      await User.findByIdAndUpdate(creatorId, {
        $push: {
          requests: {
            formData,
            userId,
            groupId,
          },
        },
      });
      // userId sends a request
      await User.findByIdAndUpdate(userId, {
        $push: {
          requests: {
            formData,
            userId,
            groupId,
          },
        },
      });
    }

    await creator.save();

    return new Response(JSON.stringify({ creator }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to request to join the group",
      }),
      {
        status: 500,
      }
    );
  }
}
