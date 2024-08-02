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

export default function SMSSelector({
  action,
  setAction,
}: {
  action: any;
  setAction: (e: any) => void;
}) {
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");


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
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact No.
                </Label>
                <Input
                  type="text"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setContact(e.target.value)}
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
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button
                onClick={() => {
                  setAction({
                    contact,
                    message,
                  });
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
