import React from 'react'

type NavbarLinkProps = {
    href: string
    label: string
    isActive?: boolean
    hover?: boolean
    blur?: boolean
    onClick?: () => void
    onHover?: () => void
    onMouseLeave?: () => void
}

export default function NavbarLink({
                                       href,
                                       label,
                                       isActive = false,
                                       hover = false,
                                       blur = false,
                                       onHover,
                                       onMouseLeave,
                                   }: NavbarLinkProps) {
    const baseClass =
        'inline-flex items-center  mx-1 pt-1 text-3xl '
    const inactiveClass = 'text-white'
    const activeClass =
        'text-gray-500'

    return (
        <a href={href} onMouseOver={onHover} onMouseEnter={onHover} onMouseLeave={onMouseLeave}
           className={`${baseClass} ${isActive ? activeClass : inactiveClass} ${hover ? "text-2xl" : "text-xl"} ${blur ? "opacity-30" : ""}`}>
            {label}
        </a>
    )
}
