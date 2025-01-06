import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { getUserByEmail } from "@/app/actions/db";

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Auth App",
  description: "Modern authentication app with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <html lang="en">
      <body
        className={`${raleway.className} bg-white min-h-screen text-gray-800`}
      >
        <main className="min-h-screen flex flex-col">
          <Navbar user={JSON.parse(JSON.stringify(user))} />
          <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
            <div>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
