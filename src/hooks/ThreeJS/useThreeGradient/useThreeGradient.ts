import * as THREE from 'three'
import React, {useEffect, useRef} from 'react'
import {setupBackgroundScene, animateGradientScene, registerGradientSceneEvents} from "../../../utils/ThreeGradient/utils";

export function useThreeJsGradient(
    mountRef: React.RefObject<HTMLDivElement>,
    {
        resolution,
        lightDir,
        innerColor,
        outerColor,
        center
    }: {
        resolution: THREE.Vector2
        lightDir: THREE.Vector2
        innerColor: THREE.Vector3
        outerColor: THREE.Vector3
        center: THREE.Vector2
    }
) {
    const targetRotationX = useRef(0)
    const targetRotationY = useRef(0)
    useEffect(() => {
        if (!mountRef.current) return

        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild)
        }

        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            1000
        )
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
        renderer.setPixelRatio(window.devicePixelRatio)
        mountRef.current.appendChild(renderer.domElement)
        const canvas = renderer.domElement
        const container = mountRef.current
        renderer.setSize(container.clientWidth * 1.05, container.clientHeight * 1.05)


        const {
            bgScene,
            bgCamera,
            bgMaterial,
            bgPlane
        } = setupBackgroundScene(resolution, lightDir, innerColor, outerColor, center)


        const light = new THREE.PointLight(0xffffff, 2, 100)
        light.position.set(10, 10, 10)
        scene.add(light)
        scene.add(new THREE.AmbientLight(0x808080))

        const stars: { mesh: THREE.Mesh; baseOpacity: number }[] = []
        const starGeometry = new THREE.SphereGeometry(0.01, 32, 32)
        for (let i = 0; i < 300; i++) {
            const baseOpacity = 0.3 + Math.random() * 0.2
            const starMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0xffffff,
                emissiveIntensity: 15.0,
                transparent: true,
                opacity: baseOpacity,
                roughness: 0.0,
                metalness: 0.0
            })
            const star = new THREE.Mesh(starGeometry, starMaterial)
            star.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            )
            stars.push({mesh: star, baseOpacity})
            scene.add(star)
        }


        animateGradientScene({renderer, scene, camera, bgScene, bgCamera, targetRotationX, targetRotationY})

        const cleanupEvents = registerGradientSceneEvents({
            canvas: renderer.domElement,
            container,
            camera,
            renderer,
            targetRotationX,
            targetRotationY
        })

        return () => {
            cleanupEvents()
        }


    }, [mountRef, resolution, lightDir, innerColor, outerColor, center])
}
