"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export function CreateAccount() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();
  const submit = async () => {
    try {
      await axios.post("/api/user/signup", {
        name,
        email,
        password,
      });
      toast({
        title: "Account Successfully Created",
        description: "Sign in with your credentials",
      });

      router.push("/signin");
    } catch (error: any) {
      toast({
        title: error.response.data.message ?? error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              placeholder="Enter username"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button onClick={submit} className="w-full">
            Get Started Free
          </Button>
          <div className="flex items-center mt-4">
            <p>
              Already have an account?
              <Link
                className="ml-2 text-blue-500 underline font-sans"
                href={"/signin"}
              >
                Login
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
