'use client';
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarItem,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
export const UserDropdown = () => {
    const [userName, setUserName] = useState('');
    const handleClick = (actionKey: string) => {
        if (actionKey === 'logout') signOut();
    }
    const session = useSession();
    useEffect(() => {
        if (session.data?.user?.name) {
            const fullName = session.data.user.name.split(' ');
            if (fullName.length > 1) {
                setUserName(fullName[0].substring(0, 1) + fullName[1].substring(0, 1));
            } else {
                setUserName(fullName[0].substring(0, 1));
            }
        }
    }, [session]);

    return (
        <Dropdown>
            <NavbarItem>
                <DropdownTrigger>
                    <Avatar
                        as='button'
                        color='secondary'
                        size='md'
                        showFallback
                        name={userName}
                    />
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
                aria-label='User menu actions'
                onAction={(actionKey) => handleClick(actionKey as string)}
            >
                <DropdownItem
                    key='profile'
                    className='flex flex-col justify-start w-full items-start'
                >
                    <p>{session.data?.user?.name}</p>
                </DropdownItem>
                <DropdownItem key='logout' color='danger' className='text-danger ' textValue='Cerrar Sesión'>
                    Cerrar Sesión
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}