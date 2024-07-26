'use client';

import { usePathname } from 'next/navigation';
import { useSidebarContext } from '../layout/layout-context';
import { Sidebar } from './Sidebar.styles';
import { HomeIcon } from '../icons/sidebar/HomeIcon';
import { AccountsIcon } from '../icons/sidebar/AccountsIcon';
import { SidebarItem } from './Sidebar-item';
import { SidebarMenu } from './Sidebar-menu';
import { signOut, useSession } from 'next-auth/react';

export const SidebarWrapper = () => {
    const pathName = usePathname();
    const session = useSession();
    if (session.data?.user) {
        //@ts-ignore
        if (!session.data.user.tokenExpiresIn || Date.now() > session.data.user.tokenExpiresIn) {
            signOut();
        }
    }
    const { collapsed, setCollapsed } = useSidebarContext();

    return (
        <aside className='h-screen z-[20] sticky top-0'>
            {collapsed ? (
                <div className={Sidebar.Overlay()} onClick={setCollapsed}></div>
            ) : null}
            <div
                className={Sidebar({
                    collapsed: collapsed
                })}
            >
                <div className={Sidebar.Header()}>
                    Companies Drop Down
                </div>
                <div className='flex flex-col justify-between h-full'>
                    <div className={Sidebar.Body()}>
                        <SidebarItem
                            title='Home'
                            icon={<HomeIcon />}
                            isActive={pathName === '/'}
                            href='/'
                        />
                        <SidebarMenu title='Mantenimiento'>
                            <SidebarItem
                                isActive={pathName === '/clientes'}
                                title='Clientes'
                                icon={<AccountsIcon />}
                                href='/clientes'
                            />
                            <SidebarItem
                                isActive={pathName === '/productos'}
                                title='Productos'
                                icon={<AccountsIcon />}
                                href='/productos'
                            />
                        </SidebarMenu>
                        <SidebarMenu title='Comprobantes'>
                            <SidebarItem
                                isActive={pathName.indexOf('facturas') > 0}
                                title='Facturas'
                                icon={<AccountsIcon />}
                                href='/facturas'
                            />
                        </SidebarMenu>
                    </div>
                </div>
            </div>
        </aside>
    )

}