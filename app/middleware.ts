import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Paths that don't require authentication
const publicPaths = [
  "/login",
  "/signup",
  "/",
  "/api/v1/login",
  "/api/v1/signup",
];

// Function to get JWT secret as Uint8Array (required by jose)
const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return new TextEncoder().encode(secret);
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow public paths without authentication
  if (publicPaths.some((publicPath) => path.startsWith(publicPath))) {
    return NextResponse.next();
  }

  // Get token from Authorization header or cookies
  const token =
    request.headers.get("Authorization")?.replace("Bearer ", "") ||
    request.cookies.get("token")?.value;

  // If accessing admin routes
  const isAdminRoute = path.startsWith("/admin");

  if (!token) {
    // Redirect to login if no token is provided
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify and decode the JWT token
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    // Check user role for admin routes
    if (isAdminRoute && payload.role !== "admin") {
      // Return 403 Forbidden if user is not an admin trying to access admin routes
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Access denied: Admin privileges required",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Add user info to request headers for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", String(payload.userId));
    requestHeaders.set("x-user-role", String(payload.role));

    // Continue with the request
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // Invalid token - redirect to login
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
