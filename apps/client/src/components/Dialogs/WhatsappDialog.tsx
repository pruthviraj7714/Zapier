"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function WhatsappSelector({
  action,
  setAction,
}: {
  action: any;
  setAction: (metadata: any) => void;
}) {
  const [whatsappNo, setWhatsappNo] = useState(action?.metadata?.whatsappNo || "");
  const [message, setMessage] = useState(action?.metadata?.message || "");

  useEffect(() => {
    if (action?.metadata) {
      setWhatsappNo(action.metadata.whatsappNo || "");
      setMessage(action.metadata.message || "");
    }
  }, [action]);

  return (
    <Dialog open={!!action} onOpenChange={() => setAction(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Metadata</DialogTitle>
          <DialogDescription>
            Provide metadata for the selected action.
          </DialogDescription>
        </DialogHeader>
        {action && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={action.image}
                alt={action.name}
                className="h-8 w-8 rounded-full"
              />
              <h1 className="text-xl font-semibold">{action.name}</h1>
            </div>
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="whatsapp_no"
                  className="block text-sm font-medium text-gray-700"
                >
                  Whatsapp No
                </Label>
                <Input
                  type="text"
                  value={whatsappNo}
                  onChange={(e) => setWhatsappNo(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </Label>
                <Input
                  type="textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <Button
                onClick={() => {
                  setAction({ whatsappNo, message });
                }}
                className="mt-4 w-full"
              >
                Save Metadata
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
