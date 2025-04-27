import React, { useRef } from 'react'
import * as THREE from 'three'
import { useThreeJsGradient } from '../../hooks/ThreeJS/useThreeGradient/useThreeGradient'

type ThreeJsGradientProps = {
    resolution?: THREE.Vector2
    lightDir?: THREE.Vector2
    innerColor?: THREE.Vector3
    outerColor?: THREE.Vector3
    center?: THREE.Vector2
    className?: string
}

export default function ThreeGradient(props: ThreeJsGradientProps) {
    const {
        resolution = new THREE.Vector2(300, 300),
        lightDir = new THREE.Vector2(0.005, 0.1),
        innerColor = new THREE.Vector3(1.0, 0.5, 0.1),
        outerColor = new THREE.Vector3(0.05, 0.02, 0.005),
        center = new THREE.Vector2(0.5, 0.5),
        className = ''
    } = props

    const mountRef = useRef<HTMLDivElement | null>(null)

    useThreeJsGradient(mountRef, { resolution, lightDir, innerColor, outerColor, center })

    return <div ref={mountRef} className={className} />
}
