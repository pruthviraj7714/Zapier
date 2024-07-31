"use client";
import ElementCell from "@/components/ElementCell";
import { WEBHOOK_BASE_URL } from "@/config/config";
import axios from "axios";
import { ArrowBigDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function ({
  params,
}: {
  params: {
    zapId: string;
  };
}) {
  const [zap, setZap] = useState<any>({});
  const getZap = async () => {
    const res = await axios.get(`/api/zap/${params.zapId}`);
    console.log(res.data);
    setZap(res.data.zap);
  };

  useEffect(() => {
    getZap();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-r from-gray-100 to-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mb-6">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700">
          Zap Workflow
        </h1>
        {zap && zap.trigger && (
          <div className="flex justify-center items-center">
            <ElementCell
              index={0}
              image={zap.trigger.type.image}
              name={zap.trigger.type.name}
            />
          </div>
        )}
        <div className="flex flex-col items-center">
          <ArrowBigDown
            size={40}
            className="text-gray-500 my-4 animate-bounce"
          />
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-6">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">
              Your Zap's Webhook URL
            </h2>
            <p className="text-lg text-red-500 font-sans mb-2">
              Note: This Webhook URL triggers your zap. When the trigger is
              activated, all your further actions take place one by one.
            </p>
            <p className="text-blue-600 underline cursor-pointer break-all transition-colors duration-300 hover:text-blue-800 text-center">
              {WEBHOOK_BASE_URL}/{zap.userId}/{zap.id}
            </p>
          </div>
        </div>
        <h1 className="text-center my-3 font-bold text-2xl">Action Flow</h1>
        {zap && zap.actions && zap.actions.length > 0 ? (
          zap.actions.map((action: any, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center mb-6 transition-all duration-300 transform hover:scale-105"
            >
              <ElementCell
                index={action.sortingOrder}
                image={action.type.image}
                name={action.type.name}
              />
              {index !== zap.actions.length - 1 && (
                <ArrowBigDown
                  size={40}
                  className="text-gray-500 my-4 animate-bounce"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No actions available</p>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-6">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">
          Total Zap Runs by Your Zap
        </h2>
        <p className="text-lg text-gray-700">
          ZapRun Count: {zap.zapRuns && zap.zapRuns.length}
        </p>
      </div>
    </div>
  );
}
