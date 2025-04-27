import * as THREE from "three";
import React from "react";

export function setupBackgroundScene(resolution: THREE.Vector2, lightDir: THREE.Vector2, innerColor: THREE.Vector3, outerColor: THREE.Vector3, center: THREE.Vector2) {
    const bgScene = new THREE.Scene()
    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const bgMaterial = new THREE.ShaderMaterial({
        uniforms: {
            resolution: {value: resolution},
            lightDir: {value: lightDir},
            innerColor: {value: innerColor},
            outerColor: {value: outerColor},
            center: {value: center}
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
                uniform vec3 innerColor;
                uniform vec3 outerColor;
                uniform vec2 center;
                varying vec2 vUv;

                void main() {
                    vec2 light = normalize(lightDir);
                    float dist = distance(vUv, center);
                    float height = exp(-4.0 * dist);
                    vec2 gradient = normalize(vUv - center);
                    vec3 normal = normalize(vec3(gradient.x, gradient.y, 1.0 - height));
                    vec3 lightVec = normalize(vec3(light, 0.5));
                    float diffuse = clamp(dot(normal, lightVec), 0.0, 1.0);
                    vec3 baseColor = mix(innerColor, outerColor, dist);
                    vec3 shadedColor = baseColor * (0.3 + 0.7 * diffuse);
                    float glow = 0.01 / (dist + 0.01);
                    shadedColor += vec3(glow * 0.3);
                    gl_FragColor = vec4(shadedColor, 1.0);
                }
            `,
        depthWrite: false
    })

    const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMaterial)
    bgScene.add(bgPlane)
    return {bgScene, bgCamera, bgMaterial, bgPlane}
}

export function animateGradientScene({
                                  renderer,
                                  scene,
                                  camera,
                                  bgScene,
                                  bgCamera,
                                  targetRotationX,
                                  targetRotationY
                              }: {
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    bgScene: THREE.Scene
    bgCamera: THREE.OrthographicCamera
    targetRotationX: React.MutableRefObject<number>
    targetRotationY: React.MutableRefObject<number>
}) {
    const animate = () => {
        requestAnimationFrame(animate)

        scene.rotation.x += (targetRotationX.current - scene.rotation.x) * 0.05
        scene.rotation.y += (targetRotationY.current - scene.rotation.y) * 0.05

        renderer.autoClear = false
        renderer.clear()
        renderer.render(bgScene, bgCamera)
        renderer.render(scene, camera)
    }

    animate()
}

export function registerGradientSceneEvents({
                                         canvas,
                                         container,
                                         camera,
                                         renderer,
                                         targetRotationX,
                                         targetRotationY
                                     }: {
    canvas: HTMLCanvasElement
    container: HTMLDivElement
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    targetRotationX: React.MutableRefObject<number>
    targetRotationY: React.MutableRefObject<number>
}) {
    const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height
        targetRotationY.current = (x - 0.5) * 0.6
        targetRotationX.current = (y - 0.5) * 0.6
    }

    const handleScroll = (event: WheelEvent) => {
        targetRotationY.current += event.deltaY * 0.0002
        targetRotationX.current += event.deltaX * 0.0002
    }

    const handleResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.clientWidth * 1.05, container.clientHeight * 1.05)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('wheel', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('wheel', handleScroll)
        window.removeEventListener('resize', handleResize)
    }
}

