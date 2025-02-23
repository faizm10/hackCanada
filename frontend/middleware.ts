import { NextResponse } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // List of public routes (accessible without authentication)
  const publicRoutes = ["/","/login", "/signup", "/auth/callback"]

  // Get the pathname of the request
  const path = req.nextUrl.pathname

  // If user is logged in and tries to access login/signup pages, redirect to dashboard
  if (session && publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // If user is NOT logged in and tries to access a protected route, redirect to login
  if (!session && !publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

