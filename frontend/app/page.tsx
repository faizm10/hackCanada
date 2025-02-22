"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseClient";
import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Tenant Shield</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login with Google"}
            </Button>
            <div className="text-center text-sm">
              New here? {" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        By signing in, you agree to our <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative w-full h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 bg-black bg-opacity-80 text-white w-full">
        <div className="flex items-center">
          <GalleryVerticalEnd className="size-6 mr-2" />
          <span className="text-xl font-semibold">Tenant Shield</span>
        </div>
        <div className="flex space-x-6">
          <Link href="/services" className="hover:underline">Services</Link>
          <Link href="/contact" className="hover:underline">Contact Us</Link>
        </div>
      </nav>
      <div className="flex flex-col md:flex-row items-center w-full max-w-6xl mt-20">
        <div className="text-center md:text-left md:w-1/2 p-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Tenant Shield</h1>
          <p className="text-lg md:text-xl mb-6">Your trusted partner in tenant assistance, ensuring comfort and support every step of the way.</p>
          <Link href="/login">
            <button className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg text-lg hover:bg-white hover:text-black transition">
              Login
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 p-6">
          <Image src="/images/image.png" alt="Office Space" width={600} height={400} className="rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="text-center text-lg mt-12 max-w-4xl">
        <p className="font-bold text-xl">⭐⭐⭐⭐⭐</p>
        <h2 className="text-2xl font-semibold mt-4">Outstanding Support!</h2>
        <p className="mt-2">Tenant Shield has transformed my renting experience with their exceptional service and dedication.</p>
        <p className="mt-4 text-gray-400">- Alex Johnson</p>
      </div>
    </div>
  );
}
