import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

type ThreeDTextProps = {
  text: string
  size?: number
  color?: number
  hoverDepth?: number
  baseDepth?: number
  width?: number
  height?: number
  onClick?: () => void
}

export default function ThreeDText({
  text,
  size = 1,
  color = 0xffffff,
  hoverDepth = 0.02,
  baseDepth = 0.0,
  width = 200,
  height = 60,
  onClick
}: ThreeDTextProps) {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    const loader = new FontLoader()
    let mesh: THREE.Mesh | null = null

    loader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const createGeometry = (depth: number) => {
        const geometry = new TextGeometry(text, {
          font,
          size,
          depth,
          bevelEnabled: true,
          bevelThickness: 0.01,
          bevelSize: 0.01,
          bevelSegments: 10
        })
        geometry.center()
        return geometry
      }

      const createMaterial = (depth: number) =>
        new THREE.MeshStandardMaterial({
          color,
          roughness: depth,
          metalness: depth
        })

      const material = createMaterial(baseDepth)
      mesh = new THREE.Mesh(createGeometry(baseDepth), material)
      scene.add(mesh)

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
      dirLight.position.set(0, 0, 5)
      scene.add(ambientLight, dirLight)

      const animate = () => {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
      animate()

      const updateDepth = (depth: number) => {
        if (mesh) {
          scene.remove(mesh)
          mesh.geometry.dispose()
          mesh.geometry = createGeometry(depth)
          scene.add(mesh)
        }
      }

      const handleEnter = () => {
        setHovered(true)
        updateDepth(hoverDepth)
      }

      const handleLeave = () => {
        setHovered(false)
        updateDepth(baseDepth)
      }

      mountRef.current?.addEventListener('mouseenter', handleEnter)
      mountRef.current?.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      renderer.dispose()
      while (mountRef.current?.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild)
      }
    }
  }, [text, size, color, hoverDepth, baseDepth, width, height])

  return (
    <div
      className="flex shrink-0 items-center cursor-pointer"
      onClick={onClick}
      ref={mountRef}
    >
      <div className={`h-[${height}px] w-[${width}px]`} />
    </div>
  )
}

