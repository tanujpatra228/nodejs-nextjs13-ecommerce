"use client"

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Menu } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';

const AuthButton = () => {
    const { data: session } = useSession();
    const route = useRouter();
    const links = [
        { href: '/account-settings', label: 'Account settings' },
        { href: '/support', label: 'Support' },
        { href: '/license', label: 'License' },
        { href: '#logout', label: 'Log out' },
    ];

    return (
        <>
            {
                session && session.user ? (
                    <div className='relative'>
                        <Menu>
                            <Menu.Button className='cap'>Hi, {session.user.name}!</Menu.Button>
                            <Menu.Items className='absolute z-10 w-56 mt-2 origin-top-right bg-white p-1 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition duration-75'>
                                {links.map((link) => (
                                    /* Use the `active` state to conditionally style the active item. */
                                    <Menu.Item key={link.href} as={Fragment}>
                                        {({ active }) => (
                                            link.href === '#logout' ? (
                                                <button
                                                    onClick={() => signOut()}
                                                    className={`w-full block px-4 py-2 text-sm rounded-md text-left ${active ? 'bg-red-400 text-white' : 'bg-white text-black'
                                                        }`}
                                                >
                                                    {link.label}
                                                </button>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className={`block px-4 py-2 text-sm rounded-md text-left ${active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                                        }`}
                                                >
                                                    {link.label}
                                                </Link>
                                            )
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Menu>
                    </div>
                ) : (
                    <button onClick={() => route.push('/login')} className="transition duration-300 focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500" style={{ textUnderlineOffset: 8 }}>
                        Login
                    </button>
                )
            }
        </>
    )
}

export default AuthButton