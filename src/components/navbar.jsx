"use client";
import React from "react";
import Link from "next/link";
import { Special_Elite } from "next/font/google";
import { redirect, useRouter } from "next/navigation";

const specialElite = Special_Elite({ subsets: ["latin"], weight: "400" });

export default function Navbar({ user }) {
  const router = useRouter();
  const handleSignOut = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/signout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      router.push("/")
    }
  };

  return (
    <nav className="text-gray-800 py-4 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* App Name */}
        <div className={`text-3xl font-extrabold ${specialElite.className}`}>
          <Link href="/">LCGrind</Link>
        </div>

        {/* Right-aligned Navigation Links */}
        <ul className="hidden md:flex space-x-8 ml-auto text-xl">
          <li>
            <button
              className="hover:text-blue-400"
              onClick={() => {
                router.push("/groups");
              }}
            >
              Groups
            </button>
          </li>
          <li>
            <button
              className="hover:text-blue-400"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Dashboard
            </button>
          </li>
          <li>
            {user ? (
              <button
                className="hover:text-blue-400"
                onClick={() => {
                  handleSignOut();
                }}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="hover:text-blue-400"
                onClick={() => {
                  router.push("/signin");
                }}
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
