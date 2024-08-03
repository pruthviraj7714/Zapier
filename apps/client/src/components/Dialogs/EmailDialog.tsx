"use client";

import { useState } from "react";
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

export default function EmailSelector({
  action,
  setAction,
}: {
  action: any;
  setAction: (e: any) => void;
}) {
  const [toPerson, setToPerson] = useState("");
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const availableSuggestions = ['{comment.name}', '{comment.date}', '{comment.body}'];

  const handleMessageChange = (e: any) => {
    const value = e.target.value;
    setMessage(value);

    const lastWord = value.split(" ").pop() || "";

    if (lastWord.length > 0) {
      setSuggestions(availableSuggestions.filter(s => s.includes(lastWord)));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const words = message.split(" ");
    words.pop(); // Remove the current incomplete word
    setMessage(words.join(" ") + " " + suggestion + " ");
    setShowSuggestions(false);
  };

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
                  htmlFor="to"
                  className="block text-sm font-medium text-gray-700"
                >
                  To
                </Label>
                <Input
                  type="email"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setToPerson(e.target.value)}
                />
              </div>
              <div className="space-y-2 relative">
                <Label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </Label>
                <Input
                  type="textarea"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  value={message}
                  onChange={handleMessageChange}
                />
                {showSuggestions && (
                  <div className="absolute z-10 w-full bg-white border dark:text-black border-gray-300 rounded-md shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button
                className="mt-4 w-full"
                onClick={() => {
                  setAction({
                    toPerson,
                    message,
                  });
                }}
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
