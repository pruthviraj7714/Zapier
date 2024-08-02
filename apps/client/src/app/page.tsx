"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession();

  if(session?.data?.user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
      <div className="flex flex-col justify-center items-center mt-16">
        <h1 className="text-6xl font-bold max-w-4xl text-center">
          Automate as fast as you can type
        </h1>
        <h1 className="font-semibold text-center text-2xl max-w-5xl my-5">
          AI gives you automation superpowers, and Zapier puts them to work.
          Pairing AI and Zapier helps you turn ideas into workflows and bots
          that work for you.
        </h1>
        <div className="flex gap-4 text-lg my-4">
          <button className="px-10 py-3 bg-orange-600 text-white rounded-full">
            Start free with email
          </button>
          <button className="px-10 py-3 flex gap-3 items-center border border-black rounded-full">
            <img src="/google_logo.png" className="h-6 w-6" /> Start free with
            Google
          </button>
        </div>
        <div className="flex items-center gap-3.5 my-6">
          <div className="text-sm">
            ✔<span className="font-bold ml-1 mr-1">Free forever</span>for core
            features
          </div>
          <div className="text-sm">
            ✔<span className="font-bold ml-1 mr-1">More apps</span>than any
            other platform
          </div>
          <div className="text-sm">
            ✔ Cutting edge <span className="font-bold">AI features</span>
          </div>
        </div>
        <div className="my-6">
          <video
            className="max-w-5xl"
            src="https://res.cloudinary.com/zapier-media/video/upload/f_auto,q_auto/v1706042175/Homepage%20ZAP%20Jan%2024/012324_Homepage_Hero1_1920x1080_pwkvu4.mp4"
            autoPlay
            muted
            loop
          />
        </div>
        <div className="flex flex-col items-center bg-teal-200 w-full h-full p-5">
          <h1 className="text-6xl max-w-5xl text-center my-3 font-bold">
            Meet Zapier: Your new home to automate anything
          </h1>
          <h1 className="font-semibold text-2xl max-w-6xl text-center my-2">
            You dream up what to automate—Zapier will handle the rest. Combine
            user interfaces, data tables, and logic with{" "}
            <span className="underline">7,000+ apps</span> to build and automate
            anything you can imagine.
          </h1>
          <h1 className="font-semibold text-2xl max-w-6xl text-center my-2">
            Zapier will help you grow twice as fast, even without hiring another
            person.
          </h1>
          <video
            className="max-w-7xl my-8"
            src="https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/v1706050747/Homepage%20ZAP%20Jan%2024/012224_Homepage_Hero2_R3_V4_ybz1kv.mp4"
            autoPlay
            muted
            loop
          />
        </div>
      </div>
    </div>
  );
}
