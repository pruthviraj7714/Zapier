"use client";
import { Button } from "@/components/ui/button";
import ZapCell from "@/components/ZapCell";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import ElementCell from "@/components/ElementCell";

export default function ZapPage() {
  const [selectedTrigger, setSelectedTrigger] = useState<{
    name: string;
  } | null>(null);
  const [selectedActions, setSelectedActions] = useState<any[]>([]);
  const [selectedModelIndex, setSelectedModelIndex] = useState<null | number>(
    null
  );
  const [availableActions, setAvailableActions] = useState<any[]>([]);
  const [availableTriggers, setAvailableTriggers] = useState<any[]>([]);

  const { toast } = useToast();

  const getAvailableTriggers = async () => {
    try {
      const res = await axios.get("/api/trigger/available");
      setAvailableTriggers(res.data.availableTriggers);
    } catch (error: any) {
      toast({
        title: error.response.data.message,
      });
    }
  };

  const getAvailableActions = async () => {
    try {
      const res = await axios.get("/api/action/available");
      setAvailableActions(res.data.availableActions);
    } catch (error: any) {
      toast({
        title: error.response.data.message,
      });
    }
  };

  const handleTriggerClick = () => {
    setSelectedModelIndex(1);
  };

  const handleActionClick = (index: number) => {
    setSelectedModelIndex(2 + index);
  };

  const selectTrigger = (trigger: any) => {
    setSelectedTrigger(trigger);
    setSelectedModelIndex(null);
  };

  const selectAction = (action: any, index: number) => {
    const updatedActions = [...selectedActions];
    updatedActions[index] = action;
    setSelectedActions(updatedActions);
    setSelectedModelIndex(null);
  };

  useEffect(() => {
    getAvailableTriggers();
    getAvailableActions();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <Button className="absolute right-10 top-10">Publish</Button>
      <div className="flex flex-col justify-center items-center space-y-4">
        <ZapCell
          onClick={handleTriggerClick}
          index={1}
          name={selectedTrigger ? selectedTrigger.name : "Trigger"}
        />
        {selectedActions.length > 0 ? (
          selectedActions.map((action, index) => (
            <ZapCell
              key={index}
              onClick={() => handleActionClick(index)}
              index={2 + index}
              name={action.name ? action.name : "Action"}
            />
          ))
        ) : (
          <div className="text-gray-500">No actions selected</div>
        )}

        <div
          onClick={() => setSelectedActions([...selectedActions, {}])}
          className="flex items-center space-x-2 mt-4 p-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-200"
        >
          <PlusCircle className="w-6 h-6" />
          <span>Add Action</span>
        </div>
      </div>

      <Dialog
        open={selectedModelIndex === 1}
        onOpenChange={() => setSelectedModelIndex(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Trigger</DialogTitle>
            <DialogDescription>
              Select trigger for your zap here. Click on the trigger to select
              it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              {availableTriggers && availableTriggers.length > 0 ? (
                availableTriggers.map((trigger, index) => (
                  <div key={index} onClick={() => selectTrigger(trigger)}>
                    <ElementCell
                      name={trigger.name}
                      image={trigger.image}
                      index={index + 1}
                    />
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center font-bold text-red-500">
                  No Triggers Found!
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {selectedActions.map((action, index) => (
        <Dialog
          key={index}
          open={selectedModelIndex === 2 + index}
          onOpenChange={() => setSelectedModelIndex(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Action</DialogTitle>
              <DialogDescription>
                Select action for your zap here. Click on the action to select
                it.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-4">
                {availableActions && availableActions.length > 0 ? (
                  availableActions.map((action, idx) => (
                    <div key={idx} onClick={() => selectAction(action, index)}>
                      <ElementCell
                        name={action.name}
                        image={action.image}
                        index={idx + 1}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center font-bold text-red-500">
                    No Actions Found!
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
