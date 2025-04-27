import React, {useRef, useEffect} from 'react'
import * as THREE from 'three'
import ThreeGradient from "../ThreeGradient/ThreeGradient";

type CardProps = {
    resolution?: THREE.Vector2
    lightDir?: THREE.Vector2
    innerColor?: THREE.Vector3
    outerColor?: THREE.Vector3
    center?: THREE.Vector2
    className?: string
    children?: React.ReactNode
}

export default function Card({
                                 resolution = new THREE.Vector2(300, 300),
                                 lightDir = new THREE.Vector2(0.00, 1.5),
                                 className = '',
                                 children
                             }: CardProps) {

    const containerRef = useRef<HTMLDivElement | null>(null)

    return (
        <div
            ref={containerRef}
            className={`relative rounded-3xl shadow-xl overflow-hidden m-4 bg-slate-800 ${className}`}
        >
            {/* Background Gradient */}
            <ThreeGradient
                resolution={resolution}
                lightDir={lightDir}
                innerColor={new THREE.Vector3(0.7, 0.3, 1.0)}
                outerColor={new THREE.Vector3(0.05, 0.02, 0.005)}
                center={new THREE.Vector2(0.5, -0.5)}

                className="absolute inset-0 z-0"
            />

            {/* Content */}
            <div className="relative z-10 p-6">
                {children}
            </div>
        </div>
    )
}

