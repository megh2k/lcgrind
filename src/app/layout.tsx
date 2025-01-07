import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
// import Loading from "./loading";
// import { Suspense } from "react";

const raleway = Raleway({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "LCGrind",
  description: "Modern authentication app with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#FFFDF0" }}
        className={`${raleway.className} min-h-screen text-gray-800`}
      >
        <script
          type="module"
          defer
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/helix.js"
        ></script>
        <main className="min-h-screen flex flex-col">
          {/* <Suspense fallback={<Loading />}> */}
            <Navbar />
            <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl">
              <div>{children}</div>
            </div>
          {/* </Suspense> */}
        </main>
      </body>
    </html>
  );
}
