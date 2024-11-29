'user server'

import { auth, signIn } from "@/auth";
import { wooriSignIn } from "../authApi";

export async function GET(req) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    console.log('redirect code ', code)
    await signIn('oauth-woori', { code : 'code', });

    // const response = await wooriSignIn(code);
    // const { accessToken, name } = response;

    // const session = await auth();
    // console.log(session);
    // // session.user.accessToken = accessToken;

    // console.log(accessToken, name);
    return Response.redirect('http://localhost:3000', 302);
}
