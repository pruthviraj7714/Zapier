"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
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
        description:
          error.response?.data?.message ||
          error.message ||
          "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
      <div className="bg-white dark:bg-black p-8 dark:text-white rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-white">
          Login to Your Account
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6 mt-2">
          Enter your credentials below to login to your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <div className="flex justify-center items-center mt-4">
            <p>
              Don't have an account?
              <Link
                className="ml-2 text-blue-500 underline font-sans"
                href={"/signup"}
              >
                Sign up
              </Link>
            </p>
          </div>
      </div>
    </div>
  );
}
