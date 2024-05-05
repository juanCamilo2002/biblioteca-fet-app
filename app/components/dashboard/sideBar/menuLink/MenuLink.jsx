"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const MenuLink = ({link, className, active}) => {
    const pathname = usePathname();
    return (
        <Link href={link.path} className={`${className} ${pathname === link.path && active}`}>
            {link.icon}
            {link.title}
        </Link>
    )
}

export default MenuLink
