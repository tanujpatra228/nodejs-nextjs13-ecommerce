'use client'
import { Menu } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    links: {
        label: string;
        href: string;
    }[];
    disableAllLinks?: boolean;
}

const VerticalMenu = ({ links, disableAllLinks = false }: Props) => {
    const pathName = usePathname();
    return (
        <Menu as={'nav'} className='relative group grid grid-flow-col lg:grid-flow-row'>
            {links.map((link) => (
                <Menu.Item
                    as={'div'}
                    key={link.href}
                >
                    {
                        link.href === '#logout' ? (
                            <button
                                className={`p-6 w-full capitalize text-center rounded-md transition delay-75 ease-in-out ${pathName === link.href && 'bg-red-50 group-hover:bg-white'} hover:!bg-red-50 lg:text-left`}
                                onClick={() => signOut()}
                                disabled={disableAllLinks}
                            >
                                {link.label}
                            </button>
                        ) : (
                            <Link
                                href={!disableAllLinks ? link.href : 'javascript:void(0)'}
                                className={`p-6 block capitalize text-center rounded-md transition delay-75 ease-in-out ${pathName === link.href && 'bg-blue-100 group-hover:bg-white'} hover:!bg-blue-100 lg:text-left`}
                            >
                                {link.label}
                            </Link>
                        )
                    }
                </Menu.Item>
            ))}
        </Menu>
    )
}

export default VerticalMenu;