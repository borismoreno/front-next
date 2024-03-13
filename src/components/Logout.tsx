'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
export default function Logout() {
    const session = useSession();
    if (!session.data?.user) {
        return <div>Not logged in</div>
    }
    return (
        <>
            <div><Button onClick={() => signOut()}>Log Out</Button></div>
        </>
    )
}