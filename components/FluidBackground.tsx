"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function ObsidianLiquid() {
    const meshRef = useRef<THREE.Mesh>(null);

    // Slowly rotate the mesh over time for an eerie, continuous flow
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
        }
    });

    return (
        // Float makes it bob gently up and down in 3D space
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere ref={meshRef} args={[2.5, 64, 64]} scale={1.2}>
                {/* The magic material that mathematically distorts the sphere into a liquid */}
                <MeshDistortMaterial
                    color="#18181b" // zinc-900 - dark and sleek
                    attach="material"
                    distort={0.4} // How much it bends out of shape
                    speed={1.5} // How fast the liquid undulates
                    roughness={0.1} // Very glossy
                    metalness={0.8} // Highly reflective
                />
            </Sphere>
        </Float>
    );
}

export default function FluidBackground() {
    return (
        // Fixed to the background, deeply beneath the UI, and ignores mouse clicks
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                {/* Subtle base lighting */}
                <ambientLight intensity={0.2} />

                {/* A bright directional light to create sharp metallic reflections */}
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={2}
                    color="#ffffff"
                />

                {/* A secondary blue/zinc tinted light for depth */}
                <directionalLight
                    position={[-5, -5, -2]}
                    intensity={1}
                    color="#a1a1aa"
                />

                <ObsidianLiquid />

                {/* Gives the metal something to reflect, mimicking a real studio environment */}
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}