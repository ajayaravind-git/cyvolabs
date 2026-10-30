"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function KineticCore() {
    const meshRef = useRef<THREE.Mesh>(null);

    // useFrame runs 60 times a second (locked to the screen's refresh rate)
    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // 1. CONTINUOUS IDLE SPIN: Slowly rotate the object on its Z axis
        meshRef.current.rotation.z += delta * 0.15;

        // 2. MOUSE TRACKING: Calculate where the mouse is (from -1 to 1 on the screen)
        // We multiply by Math.PI / 4 to limit how far the object tilts
        const targetX = (state.pointer.x * Math.PI) / 4;
        const targetY = (state.pointer.y * Math.PI) / 4;

        // 3. SCROLL TRACKING: Tie the rotation to the window's scroll position
        const scrollY = window.scrollY;
        const scrollRotation = scrollY * 0.003; // Speed of the spin when scrolling

        // 4. PHYSICS (LERP): Smoothly drag the current rotation toward the target rotation
        // The "0.05" is the friction. Lower number = heavier, slower movement.
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            -targetY + scrollRotation,
            0.05
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            targetX + scrollRotation,
            0.05
        );
    });

    return (
        // Float makes it levitate naturally like it's suspended in zero gravity
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} scale={1.8}>
                {/* The Torus Knot: 1.2 radius, 0.4 tube, lots of segments for high resolution */}
                <torusKnotGeometry args={[1.2, 0.4, 256, 64]} />

                {/* Ultra-premium dark metal material */}
                <meshPhysicalMaterial
                    color="#09090b" // zinc-950 base
                    metalness={1} // Pure metal
                    roughness={0.1} // Very glossy, almost mirror-like
                    clearcoat={1} // Adds a secondary shiny layer on top like car paint
                    clearcoatRoughness={0.1}
                    envMapIntensity={2} // How strongly it reflects the virtual lights
                />
            </mesh>
        </Float>
    );
}