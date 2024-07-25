"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
export default function Appbar() {
  const router = useRouter();
  const session = useSession();
  return (
    <div className="flex justify-between items-center h-14 border-b border-gray-300 p-6">
      <Link href={"/"} className="text-black text-2xl font-extrabold">
        <span className="text-orange-500">_</span>Zapier
      </Link>
      {session.data?.user ? (
        <AlertDialog
          onOpenChange={() => {
            setTimeout(() => (document.body.style.pointerEvents = ""), 100);
          }}
        >
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="my-2 mx-3">
              Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to log out? You will need to log in again
                to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await signOut({ redirect: false });
                  router.push("/");
                }}
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <div className="flex items-center gap-3.5">
          <Link className="px-3 py-1 hover:bg-gray-200" href={"/signin"}>
            Login
          </Link>
          <Link
            href={"/signup"}
            className="bg-orange-500 hover:bg-orange-600 rounded-full px-7 py-2 font-semibold text-white"
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
}
