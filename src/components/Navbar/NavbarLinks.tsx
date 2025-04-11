import React from 'react'
import NavbarLink from './NavbarLink'
import NavbarLogo from './NavbarLogo'
import NavbarNcarButton from './NavbarIconButton'
import { useNavbarLinkState, LinkType } from '../../hooks/Navbar/useNavbarLinkState'
import NcarLogo from '../../logo-ncar.avif'

type NavbarLinksProps = {
  links: LinkType[]
    handleLinkClick: (label: string) => void
}

export default function NavbarLinks({ links, handleLinkClick }: NavbarLinksProps) {

  return (
      <div className="ml-6 flex space-x-8">
        {links.map(link => (
          <NavbarLink
            key={link.label}
            label={link.label}
            href={link.href}
            isActive={link.isActive}
            onClick={() => handleLinkClick(link.label)}
          />
        ))}
    </div>
  )
}
