"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { AuthError } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const supabase = createClientComponentClient()

  // Check authentication status
  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (error) throw error
        if (session) {
          router.push("/dashboard")
          router.refresh() // Refresh to ensure server-side data is updated
        }
      } catch (error) {
        console.error("Auth check error:", error)
        toast.error("Failed to check authentication status")
      } finally {
        setInitialLoading(false)
      }
    }

    checkUser()

    // Set up real-time listener for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/dashboard")
        router.refresh()
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error) {
      const authError = error as AuthError
      console.error("Google Sign-In Error:", authError)
      toast.error(authError.message || "Failed to sign in with Google")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Tenant Shield</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Login with Google"
              )}
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
    </div>
  )
}

