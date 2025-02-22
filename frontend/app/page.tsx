"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { title, subtitle } from "@/components/primitives";
import { siteConfig } from "@/config/site";

export default function LandingPage() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-black text-center p-6">
      {/* Logo & Branding */}
      <div className="mb-6">
        <h1 className={title({ color: "black" })}>TenantShield</h1>
        <p className={subtitle({ class: "mt-2 text-gray-600 dark:text-gray-300" })}>
          AI-powered legal assistance for Canadian tenants.
        </p>
      </div>

      {/* Hero Section */}
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold leading-tight text-black dark:text-white">
          Understand Your Rights & Resolve Rental Disputes Easily.
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          TenantShield helps you navigate rental disputes, generate legal documents, 
          and connect with free legal aid—all in one place.
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-6 flex gap-4">
        <Button
          className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
          onClick={() => router.push("/login")}
        >
          Log In
        </Button>
        <Button
          variant="outline"
          className="border border-gray-600 px-6 py-3 rounded-lg text-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          onClick={() => router.push(siteConfig.links.docs)}
        >
          Learn More
        </Button>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} TenantShield. All rights reserved.
      </footer>
    </section>
  );
}
