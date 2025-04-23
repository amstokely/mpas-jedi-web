import {useRef, useEffect} from 'react'
import * as THREE from 'three'

export default function Background() {
    const mountRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!mountRef.current) return

        // Clear previous canvas if any
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
        renderer.setSize(window.innerWidth, window.innerHeight)
        mountRef.current.appendChild(renderer.domElement)

        const canvas = renderer.domElement

        // Background shader scene
        const bgScene = new THREE.Scene()
        const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
        const bgMaterial = new THREE.ShaderMaterial({
            uniforms: {
                resolution: {value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
                lightDir: {value: new THREE.Vector2(0.005, 0.1)}
            },
            vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
            fragmentShader: `
    precision highp float;
    uniform vec2 resolution;
    uniform vec2 lightDir;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5, 0.75);
      vec2 light = normalize(lightDir);

      // Fake height based on distance to center (like bump)
      float dist = distance(vUv, center);
      float height = exp(-4.0 * dist);

      // Normal vector approximation
      vec2 gradient = normalize(vUv - center);
      vec3 normal = normalize(vec3(gradient.x, gradient.y, 1.0 - height));

      // Light direction in 3D
      vec3 lightVec = normalize(vec3(light, 0.5));

      // Diffuse shading
      float diffuse = clamp(dot(normal, lightVec), 0.0, 1.0);

      vec3 innerColor = vec3(0.7, 0.3, 1.0);
      vec3 outerColor = vec3(0.01, 0.005, 0.02);
      vec3 baseColor = mix(innerColor, outerColor, dist);

      vec3 shadedColor = baseColor * (0.3 + 0.7 * diffuse);

      // Optional glow boost
      float glow = 0.01 / (dist + 0.01);
      shadedColor += vec3(glow * 0.3);

      gl_FragColor = vec4(shadedColor, 1.0);
    }
  `,
            depthWrite: false
        });

        const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMaterial)
        bgScene.add(bgPlane)

        const light = new THREE.PointLight(0xffffff, 2, 100)
        light.position.set(10, 10, 10)
        scene.add(light)

        const ambientLight = new THREE.AmbientLight(0x808080)
        scene.add(ambientLight)

        const stars: { mesh: THREE.Mesh; baseOpacity: number }[] = []
        const starGeometry = new THREE.SphereGeometry(0.01, 32, 32)

        const count = 300
        for (let i = 0; i < count; i++) {
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

        let targetRotationX = 0
        let targetRotationY = 0

        const animate = () => {
            requestAnimationFrame(animate)

            scene.rotation.x += (targetRotationX - scene.rotation.x) * 0.05
            scene.rotation.y += (targetRotationY - scene.rotation.y) * 0.05

            renderer.autoClear = false
            renderer.clear()
            renderer.render(bgScene, bgCamera)
            renderer.render(scene, camera)
        }

        animate()

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            const x = (event.clientX - rect.left) / rect.width
            const y = (event.clientY - rect.top) / rect.height
            targetRotationY = (x - 0.5) * 0.6
            targetRotationX = (y - 0.5) * 0.6
        }

        const handleScroll = (event: WheelEvent) => {
            targetRotationY += event.deltaY * 0.0002
            targetRotationX += event.deltaX * 0.0002
        }

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        canvas.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('wheel', handleScroll)
        window.addEventListener('resize', handleResize)

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('wheel', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div
            ref={mountRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}
        />
    )
}
