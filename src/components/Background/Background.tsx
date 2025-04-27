import * as THREE from 'three'
import ThreeGradient from "../ThreeGradient/ThreeGradient";

type BackgroundProps = {
    resolution?: THREE.Vector2
    lightDir?: THREE.Vector2
    innerColor?: THREE.Vector3
    outerColor?: THREE.Vector3
    className?: string
}

export default function Background(props: BackgroundProps) {

    const {
        resolution = new THREE.Vector2(300, 300),
        lightDir = new THREE.Vector2(0.005, 0.1),
        innerColor = new THREE.Vector3(1.0, 0.5, 0.1),
        outerColor = new THREE.Vector3(0.05, 0.02, 0.005),
        className = ''
    } = props

    return (
        <div className={`absolute top-0 left-0 w-full h-full overflow-hidden ${className}`}>
            {/* Background Gradient */}
            <ThreeGradient
                resolution={resolution}
                lightDir={lightDir}
                innerColor={innerColor}
                outerColor={outerColor}
                center={new THREE.Vector2(0.5, 1.5)}
                className="absolute inset-0 z-0"
            />

        </div>
    )
}

