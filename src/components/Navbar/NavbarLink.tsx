import React from 'react'

type NavbarLinkProps = {
  href: string
  label: string
  isActive?: boolean
  onClick?: () => void
}

export default function NavbarLink({
  href,
  label,
  isActive = false,
  onClick,
}: NavbarLinkProps) {
  const baseClass =
    'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
  const activeClass = 'border-indigo-500 text-gray-900'
  const inactiveClass =
    'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'

  return (
    <a href={href} onClick={onClick} className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}>
      {label}
    </a>
  )
}
