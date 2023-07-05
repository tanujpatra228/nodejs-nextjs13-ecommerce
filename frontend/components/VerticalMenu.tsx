'use client'
import { Menu } from '@headlessui/react';
import Link from 'next/link';

type Props = {
    links: {
        label: string;
        href: string;
    }[];
}

const VerticalMenu = ({ links }: Props) => {
    return (
        <Menu as={'div'} className='relative text-left divide-y'>
            {links.map((link) => (
                <Menu.Item
                    as={'div'}
                    key={link.href}
                >
                    <Link
                        href={link.href}
                        className='p-6 block hover:bg-gray-100 capitalize'
                    >
                        {link.label}
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    )
}

export default VerticalMenu;