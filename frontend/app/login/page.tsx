"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase/firebaseClient";
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
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-background.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Empowering Tenants, Protecting Rights</h1>
        <p className="text-lg md:text-xl max-w-2xl">
          Tenant Shield helps renters understand their rights, challenge unfair treatment, and navigate housing issues.
        </p>
        <Link href="/login">
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg text-lg shadow-lg">
            Get Started
          </button>
        </Link>
      </div>
      <div className="bg-white text-black text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-6">What We Do</h2>
        <p className="max-w-3xl mx-auto text-lg mb-8">
          Tenant Shield is designed to empower tenants by providing them with legal resources, AI-driven case assistance, and expert guidance on housing laws.
        </p>
        <h2 className="text-3xl font-bold mb-6">How We Do It</h2>
        <p className="max-w-3xl mx-auto text-lg mb-8">
          We utilize AI to analyze rental agreements, assist in dispute resolution, and provide clear guidance on tenants' rights. Our platform connects tenants with legal experts when necessary.
        </p>
        <h2 className="text-3xl font-bold mb-6">How This Helps You</h2>
        <p className="max-w-3xl mx-auto text-lg">
          Whether you’re dealing with eviction threats, unfair rent increases, or need general legal advice, Tenant Shield ensures you have the knowledge and support to stand up for your rights.
        </p>
      </div>
    </div>
  );
}
