"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";

const Breadcrumb = () => {
    const router: string = usePathname();
    const bredcrumb: string[] = router.split('/').filter(e => e !== '');

    return (
        <nav className="pb-5 flex items-center text-sm leading-none text-gray-500">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
                <AiOutlineHome />
            </Link>
            {bredcrumb.length > 0 && bredcrumb.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb}>
                    <span className="mx-2">/</span>
                    {index === bredcrumb.length - 1 ? (
                        <span className="capitalize">{breadcrumb}</span>
                    ) : (
                        <Link href={`/${breadcrumb}`} className="capitalize hover:text-gray-700">
                            {breadcrumb}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
