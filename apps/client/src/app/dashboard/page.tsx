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
    }
  };

  const userInfo = async () => {
    try {
      const res = await axios.get('/api/user/info');
      setName(res.data.user.name);
    } catch (error : any) {
      toast({
        title : error.response.data.message ?? "Error while fetching User info!"
      })
    }
  }

  useEffect(() => {
    userInfo();
    getZaps();
  }, [deleting]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-green-500 text-4xl font-serif min-h-screen">
        Loading..
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-100">
      <div className="my-6 font-serif text-5xl">Welcome to Zapier, <span className="font-bold">{name}!</span></div>
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
        <h1 className="text-center text-3xl font-extrabold my-6 text-gray-900">
          My Zaps
        </h1>
        {zaps && zaps.length > 0 ? (
          <ZapTable zaps={zaps} onDelete={handleDelete} />
        ) : (
          <div className="flex justify-center text-5xl font-bold text-slate-600">
            No Zaps Created
          </div>
        )}
      </div>
    </div>
  );
}
