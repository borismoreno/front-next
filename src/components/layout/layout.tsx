'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLockedBody } from '../hooks/useBodyLock';
import { SidebarContext } from "./layout-context";
import { SidebarWrapper } from '../sidebar/Sidebar';
import { NavbarWrapper } from '../navbar/Navbar';

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [_, setLocked] = useLockedBody(false);
    const router = usePathname();

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        setLocked(!sidebarOpen);
    };
    return (
        <SidebarContext.Provider
            value={{
                collapsed: sidebarOpen,
                setCollapsed: handleToggleSidebar,
            }}
        >
            <section className={`flex ${router === '/login' ? 'justify-center' : ''}`}>
                {router !== '/login' && <SidebarWrapper />}
                {router !== '/login' ? <NavbarWrapper>{children}</NavbarWrapper> : children}
            </section>
        </SidebarContext.Provider>
        // <>
        //     {router === '/login' ? null : <div>Sidebar</div>}
        //     {children}
        // </>
    )
}