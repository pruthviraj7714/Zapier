"use client";
import { Button } from "@/components/ui/button";
import ZapCell from "@/components/ZapCell";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function ZapPage() {
  const [selectedTrigger, setSelectedTrigger] = useState("");
  const [selectedActions, setSelectedActions] = useState<any[]>([]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <Button className="absolute right-10 top-10">Publish</Button>
      <div className="flex flex-col justify-center items-center space-y-4">
        <ZapCell
          index={1}
          name={selectedTrigger ? selectedTrigger : "Trigger"}
        />
        {selectedActions.length > 0 ? (
          selectedActions.map((action, index) => (
            <ZapCell
              key={index}
              index={2 + index}
              name={action.name ? action.name : "Action"}
            />
          ))
        ) : (
          <div className="text-gray-500">No actions selected</div>
        )}

        <div
          onClick={() => {
            setSelectedActions([...selectedActions, { name: "New Action" }]);
          }}
          className="flex items-center space-x-2 mt-4 p-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-200"
        >
          <PlusCircle className="w-6 h-6" />
          <span>Add Action</span>
        </div>
      </div>
    </div>
  );
}
