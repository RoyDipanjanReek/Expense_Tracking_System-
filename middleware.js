import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
//"/dashboard(.*)"


const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)" , ])
const isPublicApiRoute = createRouteMatcher(["/api(.*)"]);


export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const currentUrl = new URL(req.url)

  const isAccessingDashboard = currentUrl.pathname === "/Home";

  // Redirect logged-in user from public pages (optional UX)
  if (userId && isPublicRoute(req) && !isAccessingDashboard) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ Don't redirect public routes or API requests
  if (!userId && !isPublicRoute(req) && !isPublicApiRoute(req)) {
    return NextResponse.redirect(new URL(isPublicApiRoute, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};