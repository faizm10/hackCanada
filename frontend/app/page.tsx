"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseClient";
import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("User Details:", result.user);
      setLoading(false);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white px-4">
      <Card className="w-full max-w-md bg-gray-900 text-white shadow-xl p-8 rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                name="username"
                placeholder="Username"
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" /> Remember me
              </label>
              <Link href="/forgot-password" className="hover:underline">Forgot Password?</Link>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Log in</Button>
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login with Google"}
            </Button>
            <div className="text-center text-sm text-gray-400">
              Don't have an account? <Link href="/signup" className="text-blue-400 hover:underline">Register</Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
