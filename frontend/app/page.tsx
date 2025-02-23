"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseClient";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { FlipText } from "@/components/magicui/flip-text";
import { MarqueeDemo } from "@/components/marquee";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Scale,
  FileText,
  Users,
  AlertTriangle,
} from "lucide-react";

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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">
            Welcome to Tenant Shield
          </CardTitle>
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
                <input type="checkbox" className="accent-blue-500" /> Remember
                me
              </label>
              <Link href="/forgot-password" className="hover:underline">
                Forgot Password?
              </Link>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Log in
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login with Google"}
            </Button>
            <div className="text-center text-sm">
              New here?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        By signing in, you agree to our{" "}
        <Link href="#" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center w-full">
        <div className="text-center md:text-left md:w-1/2 p-6">
          <BlurFade delay={0.25 + 1 * 0.05}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Protect Your <span className="text-blue-600">Tenant Rights</span>
            </h1>
          </BlurFade>
          <p className="text-lg font-bold tracking-wide text-black dark:text-white md:text-2xl">
            Get legal guidance, generate dispute letters, and track your
            cases—all in one place.
          </p>

          <div className="mt-6">
            <Link href="/login">
              <Button className="px-6 py-3 rounded-lg text-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 p-6">
          <Image
            src="/images/image.png"
            alt="Tenant Protection"
            width={500}
            height={350}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeatureCard
          title="Legal Guidance"
          description="AI-powered chatbot answers your questions based on Canadian tenancy laws."
          icon={<ShieldCheck />}
        />
        <FeatureCard
          title="Automated Legal Documents"
          description="Generate rental dispute letters, eviction appeals, and more with one click."
          icon={<FileText />}
        />
        <FeatureCard
          title="Case Tracking"
          description="Monitor your legal cases, keep track of deadlines, and receive status updates."
          icon={<Scale />}
        />
        <FeatureCard
          title="Community Support"
          description="Connect with other tenants facing similar issues and share resources."
          icon={<Users />}
        />
        <FeatureCard
          title="Landlord Dispute Assistance"
          description="Find legal resources and strategies to handle unfair rent increases or evictions."
          icon={<AlertTriangle />}
        />
        <FeatureCard
          title="Tenant Rights Education"
          description="Learn about your rights as a renter in Canada with easy-to-understand guides."
          icon={<ShieldCheck />}
        />
      </div>

      {/* Testimonials & Marquee */}
      <div className="text-center text-lg mt-12 max-w-6xl">
        <MarqueeDemo />
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg flex flex-col items-center text-center">
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-3 text-blue-600">
        {icon}
      </div>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
