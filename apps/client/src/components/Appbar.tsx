"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppMenu } from "./DropdownMenu";
import { ModeToggle } from "./Theme-Toggler";
import { useTheme } from "next-themes";

export default function Appbar() {
  const router = useRouter();
  const session = useSession();
  const { theme } = useTheme();

  return (
    <div
      className={`flex justify-between items-center h-14 border-b p-6 transition-all ${
        theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-slate-200 border-gray-300"
      }`}
    >
      <Link
        href={"/"}
        className={`text-2xl font-extrabold transition-all ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <span className="text-orange-500">_</span>Zapier
      </Link>
      <div className="flex justify-end items-center gap-4">
        {session.data?.user ? (
          <AppMenu />
        ) : (
          <div className="flex items-center gap-3.5">
            <Link
              className={`px-3 py-1 rounded transition-all ${
                theme === "dark" ? "hover:bg-gray-800 text-white" : "hover:bg-gray-200 text-black"
              }`}
              href={"/signin"}
            >
              Login
            </Link>
            <Link
              href={"/signup"}
              className="bg-orange-500 hover:bg-orange-600 rounded-full px-7 py-2 font-semibold text-white transition-all"
            >
              Signup
            </Link>
          </div>
        )}
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}