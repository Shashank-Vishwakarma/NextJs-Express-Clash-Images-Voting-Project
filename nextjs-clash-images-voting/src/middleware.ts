import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    // check for authentication

    try {
        const user = false;
        if (!user) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } catch (error) {
        console.log("Error in middleware: ", error);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/"],
};
