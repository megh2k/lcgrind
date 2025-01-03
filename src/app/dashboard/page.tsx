import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function dashboard() {
  const session = await auth();

  return <div>{session ? <h1>Dashboard</h1> : redirect("/")}</div>;
}
