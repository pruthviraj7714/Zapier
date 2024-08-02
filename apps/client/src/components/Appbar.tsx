"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppMenu } from "./DropdownMenu";
import { ModeToggle } from "./Theme-Toggler";

export default function Appbar() {
  const router = useRouter();
  const session = useSession();

  return (
    <div className="flex justify-between items-center h-14 border-b bg-slate-200 border-gray-300 p-6 dark:bg-gray-900 dark:border-gray-700 transition-colors">
      <Link href="/" className="text-2xl font-extrabold text-black dark:text-white">
        <span className="text-orange-500">_</span>Zapier
      </Link>
      <div className="flex justify-end items-center gap-4">
        {session.data?.user ? (
          <AppMenu />
        ) : (
          <div className="flex items-center gap-3.5">
            <Link
              className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors text-black dark:text-white"
              href="/signin"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-orange-500 hover:bg-orange-600 rounded-full px-7 py-2 font-semibold text-white transition-colors"
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