"use client";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { File, User2, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [info, setInfo] = useState<any>(null);
  const { toast } = useToast();

  const getUserInfo = async () => {
    try {
      const res = await axios.get("/api/user/info");
      setInfo(res.data.user);
    } catch (error: any) {
      toast({
        title: error.response.data.message ?? error.message,
      });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-700">
          <p className="text-lg font-semibold">No user found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-300">
        <div className="flex items-center border-b pb-4 mb-6">
          <User2 className="text-5xl text-teal-600 mr-4" />
          <div className="text-4xl text-gray-800 font-extrabold">{info.name}</div>
        </div>
        <div className="mb-6 flex items-center space-x-2">
          <File className="text-3xl text-gray-600" />
          <p className="text-gray-800">
            Email: <span className="font-medium text-gray-900">{info.email}</span>
          </p>
        </div>
        <div className="mb-6 flex items-center space-x-2">
          <Zap className="text-3xl text-yellow-600" />
          <p className="text-gray-800">
            Total Zaps:{" "}
            <span className="font-medium text-yellow-700">{info.zaps.length}</span>
          </p>
        </div>
        <div className="mb-6 text-lg font-semibold text-gray-700">Zaps Created by You</div>
        {info.zaps.length > 0 ? (
          <div className="space-y-4">
            {info.zaps.map((zap: any) => (
              <div
                key={zap.id}
                className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
              >
                <div className="flex items-center mb-2">
                  <Zap className="text-xl text-yellow-500 mr-2" />
                  <p className="text-lg font-semibold text-gray-800">{zap.name}</p>
                </div>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">ID:</span> {zap.id}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">Created At:</span>{" "}
                  {new Date(zap.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600">No zaps created by you</div>
        )}
      </div>
    </div>
  );
}
