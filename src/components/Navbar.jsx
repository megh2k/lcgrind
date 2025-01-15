import React from "react";
import { Special_Elite } from "next/font/google";
import { auth, signOut } from "@/auth";
import { getUserByEmail } from "@/app/actions/db";

const specialElite = Special_Elite({ subsets: ["latin"], weight: "400" });

export default async function Navbar() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <nav className="bg-[#FEFEFE] text-black py-4 shadow-md border-b border-black">
      <div className="container mx-auto flex items-center justify-between">
        <div className={`text-3xl font-extrabold ${specialElite.className}`}>
          <a
            href="/"
            className="hover:text-blue-400 transition duration-300 ease-in-out"
          >
            LCGrind
          </a>
        </div>
        <ul className="hidden md:flex space-x-8 text-lg font-semibold">
          <li>
            <a
              href="/groups"
              className="hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Groups
            </a>
          </li>
          <li>
            <a
              href="/dashboard"
              className="hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Dashboard
            </a>
          </li>
          <li>
            {user ? (
              <form
                className="hover:text-blue-400 transition duration-300 ease-in-out"
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="hover:text-blue-400 transition duration-300 ease-in-out">
                  Sign Out
                </button>
              </form>
            ) : (
              <a
                href="/signin"
                className="hover:text-blue-400 transition duration-300 ease-in-out"
              >
                Sign In
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
