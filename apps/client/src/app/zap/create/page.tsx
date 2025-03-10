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
import { useRouter } from "next/navigation";
import EmailSelector from "@/components/Dialogs/EmailDialog";
import SMSSelector from "@/components/Dialogs/SMSDialog";
import { Input } from "@/components/ui/input";

export default function ZapPage() {
  const [selectedTrigger, setSelectedTrigger] = useState<{
    name: string;
    image: string;
  } | null>(null);
  const [selectedActions, setSelectedActions] = useState<any[]>([]);
  const [selectedModelIndex, setSelectedModelIndex] = useState<null | number>(
    null
  );
  const [availableActions, setAvailableActions] = useState<any[]>([]);
  const [availableTriggers, setAvailableTriggers] = useState<any[]>([]);
  const [triggerId, setTriggerId] = useState("");
  const [actionDialog, setActionDialog] = useState<any | null>(null);
  const [zapName, setZapName] = useState<string>("");
  const router = useRouter();
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

  const createZap = async () => {
    try {
      await axios.post("/api/zap/create-zap", {
        triggerId,
        actions: selectedActions,
        zapName,
      });
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        variant : "destructive"
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
    setTriggerId(trigger.id);
    setSelectedModelIndex(null);
  };

  const selectAction = (action: any, index: number) => {
    const actionsCopy = [...selectedActions];
    actionsCopy[index] = action;
    setSelectedActions(actionsCopy);
    setSelectedModelIndex(null);
  };

  useEffect(() => {
    getAvailableTriggers();
    getAvailableActions();
  }, []);

  const updateActionMetadata = (index: number, metadata: any) => {
    const updatedActions = selectedActions.map((act, idx) =>
      idx === index ? { ...act, metadata } : act
    );
    setSelectedActions(updatedActions);
    setActionDialog(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6">
      <Button
        onClick={createZap}
        className="absolute right-10 top-10 bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition"
      >
        Publish
      </Button>
      <div className="flex justify-center items-center mt-16 mb-8">
        <Input
          type="text"
          placeholder="Add Name for Your Zap Here"
          onChange={(e) => setZapName(e.target.value)}
          className="w-[340px] p-4 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="flex flex-col justify-center items-center space-y-4">
        <ZapCell
          onClick={handleTriggerClick}
          index={1}
          name={selectedTrigger ? selectedTrigger.name : "Trigger"}
          image={selectedTrigger ? selectedTrigger.image : ""}
        />
        {selectedActions.length > 0 ? (
          selectedActions.map((action, index) => (
            <ZapCell
              key={index}
              onClick={() => handleActionClick(index)}
              index={2 + index}
              name={action.name ? action.name : "Action"}
              image={action.image ? action.image : null}
            />
          ))
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            No actions selected
          </div>
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
        <DialogContent className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Select Trigger
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Select trigger for your zap here. Click on the trigger to select
              it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              {availableTriggers && availableTriggers.length > 0 ? (
                availableTriggers.map((trigger, index) => (
                  <div
                    key={index}
                    onClick={() => selectTrigger(trigger)}
                    className="cursor-pointer"
                  >
                    <ElementCell
                      name={trigger.name}
                      image={trigger.image}
                      index={index + 1}
                    />
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center font-bold text-red-500 dark:text-red-400">
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
          <DialogContent className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Select Action
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Select action for your zap here. Click on the action to select
                it.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-4">
                {availableActions && availableActions.length > 0 ? (
                  availableActions.map((action, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        selectAction(action, index);
                        setActionDialog(action);
                      }}
                      className="cursor-pointer"
                    >
                      <ElementCell
                        name={action.name}
                        image={action.image}
                        index={idx + 1}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center font-bold text-red-500 dark:text-red-400">
                    No Actions Found!
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
      {actionDialog?.name === "Email" ? (
        <EmailSelector
          action={actionDialog}
          setAction={(metadata) =>
            updateActionMetadata(
              selectedActions.findIndex(
                (act) => act.name === actionDialog.name
              ),
              metadata
            )
          }
        />
      ) : actionDialog?.name === "SMS" ? (
        <SMSSelector
          action={actionDialog}
          setAction={(metadata) =>
            updateActionMetadata(
              selectedActions.findIndex(
                (act) => act.name === actionDialog.name
              ),
              metadata
            )
          }
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
