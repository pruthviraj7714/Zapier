"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Appbar() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center h-12 border-b p-6">
      <Link href={'/'} className="text-black text-2xl font-extrabold">
        <span className="text-orange-500">_</span>Zapier
      </Link>
      <div className="flex items-center gap-3.5">
        <Link className="px-3 py-1 hover:bg-gray-200" href={"/signin"}>
          Login
        </Link>
        <Link href={'/signup'} className="bg-orange-500 hover:bg-orange-600 rounded-full px-7 py-2 font-semibold text-white">Signup</Link>
      </div>
    </div>
  );
}
