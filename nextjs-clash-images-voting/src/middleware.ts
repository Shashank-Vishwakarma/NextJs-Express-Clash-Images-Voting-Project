import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    try {
        const token = request.cookies.get("access_token")?.value;
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        } else {
            return NextResponse.next();
        }
    } catch (error) {
        console.log("Error in middleware: ", error);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

// protected routes
export const config = {
    matcher: ["/dashboard", "/clash/items/:path*"],
};
