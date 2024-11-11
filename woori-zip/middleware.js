import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 보호된 경로
const protectedRoutes = ["/home"];
// 공개된 경로
const publicRoutes = ["/login"];

// 라우트가 수행되기 전에 호출되는 곳
// ex. lh:3-/login, lh:3-/dashboard라든지, 요청했을 때, 
export default async function middleware(req) {
  
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("session")?.value;
  console.log('cookie', cookie);
  
  const session = await decrypt(cookie);

  console.log('uid', session?.userId);
  

  if (isProtectedRoute && !session?.userId) {

    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    console.log('/home');
    
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  return NextResponse.next();
}
