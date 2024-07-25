"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast({
        title: "Signin Successful",
        description: "You have successfully signed in.",
      });

      router.push("/dashboard"); 
    } catch (error: any) {
      toast({
        title: "Signin Failed",
        description: error.response?.data?.message || error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-white p-6">
      <div className="bg-white text-black p-8 rounded-lg border border-gray-400 shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-center">
          Login to Your Account
        </h2>
        <p className="text-sm text-center mb-6 my-2">
          Enter your credentials below to login to your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <span className="text-gray-500">or</span>
        </div>
        <Button variant={"ghost"} onClick={async() => {
          await signIn("google");
        }} className="mt-4 w-full border border-gray-400 hover:bg-gray-200">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12v8h4a8 8 0 1 0-4-8z" />
            <path d="M12 12V4a8 8 0 0 0-7.75 5.6l3.1 2.4a4 4 0 0 1 4.65-4.95z" />
          </svg>
          Sign in with Google
        </Button>
        <Button variant={"ghost"} onClick={async() => {
          await signIn("github");
        }} className="mt-4 w-full border border-gray-400 hover:bg-gray-200">
          Sign in with Github
        </Button>
      </div>
    </div>
  );
}
