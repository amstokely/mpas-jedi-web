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
                                       onClick,
                                       onHover,
                                        onMouseLeave,
                                   }: NavbarLinkProps) {
    const baseClass =
        'inline-flex items-center  px-1 pt-1 '
    const inactiveClass = 'text-white'
    const activeClass =
        'text-gray-500'

    return (
        <a href={href} onMouseOver={onHover} onMouseEnter={onHover} onMouseLeave={onMouseLeave} className={`${baseClass} ${isActive ? activeClass : inactiveClass} ${hover ? "text-lg" : ""} ${blur ? "opacity-30" : ""}`}>
            {label}
        </a>
    )
}
