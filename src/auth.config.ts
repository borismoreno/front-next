import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
        signOut: '/',
    },
    callbacks: {
        authorized({ auth }) {
            const isAuthenticated = !!auth?.user;

            return isAuthenticated;
        },
    },
    providers: [],
    trustHost: true,
    secret: process.env.NEXT_PUBLIC_SECRET,
} satisfies NextAuthConfig;