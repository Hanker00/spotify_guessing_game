import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
    // Check if there is a token and the user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    console.log(token)
    const { pathname } = req.nextUrl
    // Allow requests if the following is true...
    // 1) token exists

    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next()
    }

    if (!token && pathname !== '/login') {
        const loginUrl = new URL('/login', req.url)
        return NextResponse.redirect(loginUrl)
    }
}