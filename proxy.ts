import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/auth/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // Debug log to confirm middleware execution
  console.log("Middleware (proxy.ts) executing for:", req.url);

  const res = NextResponse.next();

  res.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' https://clerk-telemetry.com https://*.clerk.accounts.dev https://api.clerk.dev wss://*.clerk.accounts.dev https://clerk.com https://*.stream-io-api.com wss://*.stream-io-api.com https://*.stream-io-video.com wss://*.stream-io-video.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://*.clerk.accounts.dev; script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://*.clerk.accounts.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://img.clerk.com; worker-src 'self' blob:; frame-src https://clerk.com https://*.clerk.accounts.dev https://challenges.cloudflare.com;"
  );

  return res;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
