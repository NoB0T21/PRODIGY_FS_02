import { NextRequest, NextResponse } from "next/server";
import { api } from "./utils/api";

export async function middleware (request: NextRequest){
    const path = request.nextUrl.pathname;
    const isPublicRout = path === '/sign-in'
    const isAdminRout = path === '/admin'
    let token = request.cookies.get('token')?.value;

    const user = await api.get('/user/valid',{
        headers:{
            Authorization:`Bearer ${token}`,
        },
        withCredentials:true
    })

    const verified:boolean = user.data.success
    if(!verified){
        request.cookies.set('token', '')
    }

    if(!token && !isPublicRout){
        const res = NextResponse.redirect(new URL('/sign-in',request.url))
        res.headers.set('x-middleware-cache', 'no-cache');
        return res
    }
    if(token && isPublicRout && verified && user.data.user !== 'admin' || (user.data.user !== 'admin' &&  isAdminRout) ){
        const res = NextResponse.redirect(new URL('/',request.url))
        res.headers.set('x-middleware-cache', 'no-cache');
        return res
    }
    if(token && isPublicRout && verified ){
        const res = NextResponse.redirect(new URL('/',request.url))
        res.headers.set('x-middleware-cache', 'no-cache');
        return res
    }

    const res = NextResponse.next();
    res.headers.set('x-middleware-cache', 'no-cache');
    return res
}

export const config = {
    matcher: ['/sign-in','/','/admin']
}