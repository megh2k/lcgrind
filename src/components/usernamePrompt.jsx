"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UsernamePrompt({ session }) {
  const router = useRouter();
  const [username, setusername] = useState("");

  const createUser = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, email: session?.user?.email }),
      });

      if (response.ok) {
        router.push("/dashboard")
      }
    }
    catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <h1>Thanks for Signing In</h1>
      <h3>Enter your Leetcode Username</h3>
      <form onSubmit={createUser}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
