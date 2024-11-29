'user server'

import { auth, signIn } from "@/auth";

export async function GET(req) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    console.log('redirect code ', code)
    await signIn('oauth-woori', { code : 'code', });

    return Response.redirect('http://localhost:3000', 302);
}
