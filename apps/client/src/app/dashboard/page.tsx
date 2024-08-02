"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ZapTable } from "@/components/ZapTable";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [zaps, setZaps] = useState([]);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [name, setName] = useState();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const getZaps = async () => {
    try {
      const res = await axios.get("/api/zap/all-zaps");
      setZaps(res.data.zaps);
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: error.response?.data?.message ?? "Error while fetching zaps!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id);
      await axios.delete(`api/zap/${id}`);
      toast({
        title: "Zap Successfully Deleted",
      });
    } catch (error: any) {
      toast({
        title: error.response.data.message,
      });
    } finally {
      setDeleting(null);
      getZaps();
    }
  };

  const userInfo = async () => {
    try {
      const res = await axios.get('/api/user/info');
      setName(res.data.user.name);
    } catch (error: any) {
      toast({
        title: error.response.data.message ?? "Error while fetching User info!"
      });
    }
  };

  useEffect(() => {
    userInfo();
    getZaps();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 dark:text-white">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                <div className="text-5xl">Loading...</div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="my-6 font-serif text-5xl text-gray-900 dark:text-white">
        Welcome to Zapier, <span className="font-bold">{name}!</span>
      </div>
      <div className="flex justify-center my-6">
        <Button
          className="bg-blue-500 text-white font-bold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 transform hover:-translate-y-1"
          onClick={() => {
            router.push("/zap/create");
          }}
        >
          Create Zap
        </Button>
      </div>
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-center text-3xl font-extrabold my-6 text-gray-900 dark:text-white">
          My Zaps
        </h1>
        {zaps && zaps.length > 0 ? (
          <ZapTable zaps={zaps} onDelete={handleDelete} />
        ) : (
          <div className="flex justify-center text-5xl font-bold text-slate-600 dark:text-slate-400">
            No Zaps Created
          </div>
        )}
      </div>
    </div>
  );
}
