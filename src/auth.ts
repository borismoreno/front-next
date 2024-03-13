import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';

const rootApi = process.env.API_URL;

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                const payload = {
                    email: credentials.email,
                    password: credentials.password,
                };

                const res = await fetch(`${rootApi}/api/auth`, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (res.status === 200) {
                    const user = await res.json();
                    return user;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                let minutesEspiresIn = 100;
                if (user.tokenExpiresInMinutes) {
                    minutesEspiresIn = user.tokenExpiresInMinutes;
                }
                const now = Date.now();
                const expires = now + (minutesEspiresIn * 60000);
                return {
                    ...token,
                    user: {
                        name: user.userName,
                        token: user.token,
                        tokenExpiresIn: expires
                    },
                };
            }

            return token;
        },
        async session({ session, token }: any) {
            if (token.user) {
                session.user = token.user;
            }
            return session;
        },
    }
});