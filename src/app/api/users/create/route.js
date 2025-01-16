import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import { checkUserNameLeetcodeExistsQuery } from "@/constants/leetcode";

export async function POST(request) {
  try {
    const { username, email } = await request.json();

    if (!username) {
      return new Response(JSON.stringify({ error: "Username is required" }), {
        status: 400,
      });
    }
    await connectToDB();
    const userNameDBExists = await User.exists({ username: username });

    // response.ok will always be true, that's how this graphql is setup
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: checkUserNameLeetcodeExistsQuery,
        variables: { username: username },
      }),
    });

    if (userNameDBExists) {
      return new Response(
        JSON.stringify({ success: false, error: "Username already exists" }),
        { status: 409 }
      );
    }
    const result = await response.json();
    const userNameLeetcodeError = result?.errors; // if errors exist => username not found

    if (userNameLeetcodeError) {
      return new Response(
        JSON.stringify({ success: false, error: "Username not found" }),
        { status: 404 }
      );
    }

    const newUser = new User({
      username,
      email,
    });

    await newUser.save();

    return new Response(JSON.stringify({ success: true, user: newUser }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Failed to create user" }),
      { status: 500 }
    );
  }
}
