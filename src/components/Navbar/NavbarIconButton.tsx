import React from 'react'

type NavbarIconButtonProps = {
    imageSrc?: string
    imageAlt?: string
    linkUrl?: string
    className?: string
}

export default function NavbarIconButton({className = '', imageAlt, imageSrc, linkUrl}: NavbarIconButtonProps) {
    return (
        <div className={`flex items-center shrink-0 ${className}`}>
            <button
                type="button"
                className="relative"
                onClick={() => window.open(linkUrl, '_blank')}
            >
                <img src={imageSrc} alt={imageAlt} className="h-8 w-auto"/>
            </button>
        </div>
    )
}

