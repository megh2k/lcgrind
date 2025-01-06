import React from "react";
import { Special_Elite } from "next/font/google";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { getUserByEmail } from "@/app/actions/db";

const specialElite = Special_Elite({ subsets: ["latin"], weight: "400" });

export default async function Navbar() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <nav className="text-gray-800 py-4 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className={`text-3xl font-extrabold ${specialElite.className}`}>
          <a href="/" className="hover:text-blue-400">LCGrind</a>
        </div>
        <ul className="hidden md:flex space-x-8 ml-auto text-xl">
          <li>
            <a href="/groups" className="hover:text-blue-400">Groups</a>
          </li>
          <li>
            <a href="/dashboard" className="hover:text-blue-400">Dashboard</a>
          </li>
          <li>
            {user ? (
              <form className="hover:text-blue-400" action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}>
                <button>Sign Out</button>
              </form>
            ) : (
              <a href="/signin" className="hover:text-blue-400">Sign In</a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}