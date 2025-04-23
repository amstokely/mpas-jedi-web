import React, {useState} from 'react'

export type LinkType = {
    label: string
    href: string
    isActive?: boolean
    hover?: boolean
    blur?: boolean
}

function handleLinkHoverFn(label: string, setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>) {
    setLinks(prevLinks =>
        prevLinks.map(link => ({
            ...link,
            isActive: link.label != label,
            hover: link.label === label,
            blur: link.label != label,
        }))
    )
}

function handleLinkClickFn(label: string, setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>) {
    setLinks(prevLinks =>
        prevLinks.map(link => ({
            ...link,
            isActive: link.label === label,
        }))
    )
}

function resetLinksFn(setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>) {
    setLinks(prevLinks =>
        prevLinks.map(link => ({
            ...link,
            isActive: false,
            hover: false,
            blur: false,
        }))
    )
}

export function useNavbarLinkState(initialLinks: LinkType[]) {
    const [links, setLinks] = useState<LinkType[]>(initialLinks)

    const handleLinkClick = (label: string) => handleLinkClickFn(label, setLinks)
    const handleHover = (label: string) => handleLinkHoverFn(label, setLinks)
    const resetLinks = () => resetLinksFn(setLinks)

    return {links, handleLinkClick, handleHover, resetLinks}
}

