'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from '@nextui-org/react';
import Layout from '@/components/layout/layout';

interface IProvidersPros {
    children: React.ReactNode;
}

export default function Providers({ children }: IProvidersPros) {
    return (
        <NextUIProvider>
            <SessionProvider>
                <Layout>
                    {children}
                </Layout>
            </SessionProvider>
        </NextUIProvider>
    )
}