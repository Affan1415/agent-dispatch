'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CLIENT_ID = '2488619'; // Replace with your ManyChat client ID
// const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || 'https://ai-powered-agents-test-repo-86ercm49d-4u1z.vercel.app//auth/callback';
const REDIRECT_URI = 'https://ai-powered-agents-test-repo-86ercm49d-4u1z.vercel.app/auth/callback';

export default function ManyChatLogin() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const loginWithManyChat = () => {
    const authUrl = `https://manychat.com/oauth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetchAccessToken(code);
    }
  }, []);

  const fetchAccessToken = async (code: string) => {
    try {
      const response = await fetch('/api/manychat-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, redirectUri: REDIRECT_URI }),
      });
      const data = await response.json();
      if (data.access_token) {
        setAccessToken(data.access_token);
        router.push('/dashboard'); // Redirect to a protected page
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Connect to Instagram via ManyChat</h1>
      <button
        onClick={loginWithManyChat}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Login with ManyChat
      </button>
    </div>
  );
}
