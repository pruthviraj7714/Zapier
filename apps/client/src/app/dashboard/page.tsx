"use client"
import { Button } from "@/components/ui/button";
import { ZapTable } from "@/components/ZapTable";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-100">
      <div className="flex justify-center">
        <Button
          className="bg-blue-500 text-white font-bold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 transform hover:-translate-y-1"
          onClick={() => {
            router.push('/zap/create');
          }}
        >
          Create Zap
        </Button>
      </div>
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-center text-3xl font-extrabold my-6 text-gray-900">My Zaps</h1>
        {/* <ZapTable /> */}
        <div className="flex justify-center text-5xl font-bold text-slate-600">
          No Zaps Created
        </div>
      </div>
    </div>
  );
}
