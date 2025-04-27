import {Disclosure} from '@headlessui/react'
import React, {useState} from 'react'
import NavbarLinks from './NavbarLinks'
import {LinkType, useNavbarLinkState} from "../../hooks/Navbar/useNavbarLinkState"
import NavbarIconButton from "./NavbarIconButton";
import GitHubIcon from "../../github-mark.png"
import NavbarNcarButton from "./NavbarIconButton";
import NcarLogo from "../../logo-ncar.avif";
import NavbarLogo from "./NavbarLogo";

export default function Navbar() {
    const [navbarLinks, setNavbarLinks] = useState<LinkType[]>([
        {label: 'About', href: '#', isActive: false, hover: false, blur: false},
        {label: 'Team', href: '#', isActive: false, hover: false, blur: false},
        {label: 'Events', href: '#', isActive: false, hover: false, blur: false},
        {label: 'Tutorials', href: '#', isActive: false, hover: false, blur: false},
        {label: 'Publications', href: '#', isActive: false, hover: false},
    ])
    const {links, handleLinkClick, handleHover, resetLinks} = useNavbarLinkState(navbarLinks)
    return (
        <Disclosure as="nav" className="fixed bg-gray-900 shadow-sm z-50 backdrop-blur-xl w-full max-w-full">
            <div className="w-full px-2 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex justify-between max-w-full">
                        <NavbarNcarButton className="mr-6" imageSrc={NcarLogo} imageAlt={'NCAR'}
                                          linkUrl={'https://ncar.ucar.edu/'}/>
                        <NavbarLogo/>
                        <NavbarLinks links={links} handleLinkClick={handleLinkClick} handleLinkHover={handleHover} handleLinkMouseLeave={resetLinks}/>
                    </div>
                    <div className="flex items-center">
                        <NavbarIconButton imageAlt={"Github"} imageSrc={GitHubIcon}
                                          linkUrl={"https://github.com/JCSDA/mpas-jedi"}/>
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}

