import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { code, redirectUri } = await req.json();

        const CLIENT_ID = '2488619'; // Replace with your ManyChat client ID
        const CLIENT_SECRET = 'fa357e9f85b5ee30b5c6c1abbe0dcf3d'; // Replace with your ManyChat client secret

        const tokenResponse = await fetch('https://api.manychat.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: redirectUri,
                code,
                grant_type: 'authorization_code',
            }),
        });

        const data = await tokenResponse.json();

        if (!tokenResponse.ok) {
            return NextResponse.json({ error: data.error_description || 'Failed to get access token' }, { status: 400 });
        }

        // Store token in a secure cookie
        const response = NextResponse.json({ message: 'Authenticated successfully' });
        response.cookies.set('manychat_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
