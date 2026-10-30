"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { ArrowRight } from "lucide-react";

// --- 1. THE 3D MORPHING LOGIC ---
// This component reads the active service index and smoothly scales/rotates different shapes
function ServiceArtifact({ activeIndex }: { activeIndex: number }) {
    const mesh0 = useRef<THREE.Mesh>(null);
    const mesh1 = useRef<THREE.Mesh>(null);
    const mesh2 = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        // Smoothly scale the active shape UP, and the inactive shapes DOWN to 0
        if (mesh0.current) {
            mesh0.current.scale.setScalar(THREE.MathUtils.lerp(mesh0.current.scale.x, activeIndex === 0 ? 1.5 : 0, 0.1));
            mesh0.current.rotation.x += delta * 0.2;
            mesh0.current.rotation.y += delta * 0.3;
        }
        if (mesh1.current) {
            mesh1.current.scale.setScalar(THREE.MathUtils.lerp(mesh1.current.scale.x, activeIndex === 1 ? 1.2 : 0, 0.1));
            mesh1.current.rotation.x -= delta * 0.1;
            mesh1.current.rotation.z += delta * 0.4;
        }
        if (mesh2.current) {
            mesh2.current.scale.setScalar(THREE.MathUtils.lerp(mesh2.current.scale.x, activeIndex === 2 ? 1.4 : 0, 0.1));
            mesh2.current.rotation.y += delta * 0.5;
            mesh2.current.rotation.x += delta * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            {/* Shape 0: Portfolios (A complex, creative Icosahedron) */}
            <mesh ref={mesh0}>
                <icosahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial color="#ffffff" wireframe={true} emissive="#ffffff" emissiveIntensity={0.2} />
            </mesh>

            {/* Shape 1: Business Engines (A solid, robust metallic cube) */}
            <mesh ref={mesh1}>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshPhysicalMaterial color="#27272a" metalness={0.9} roughness={0.1} clearcoat={1} />
            </mesh>

            {/* Shape 2: E-Commerce (A continuous, fluid Torus knot) */}
            <mesh ref={mesh2}>
                <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
                <meshPhysicalMaterial color="#a1a1aa" metalness={0.8} roughness={0.3} clearcoat={0.5} />
            </mesh>
        </Float>
    );
}

// --- 2. THE UI DATA ---
const services = [
    {
        id: "01",
        title: "Digital Portfolios",
        description: "Bespoke digital portfolios engineered for creatives who demand high-fidelity design, WebGL integration, and fluid motion. We treat your work like an art gallery.",
        deliverables: ["Creative Direction", "WebGL / Three.js", "Interactive Motion"]
    },
    {
        id: "02",
        title: "Business Engines",
        description: "Scalable, world-class web architectures designed to drive SEO, capture high-value leads, and elevate your corporate branding to the enterprise level.",
        deliverables: ["Next.js Architecture", "Headless CMS", "Technical SEO"]
    },
    {
        id: "03",
        title: "Custom Retail OS",
        description: "Conversion-optimized e-commerce interfaces built for sub-second speeds and seamless global user journeys. No templates, just pure conversion power.",
        deliverables: ["Shopify Plus", "Stripe API", "Performance Tuning"]
    }
];

// --- 3. THE MAIN LAYOUT ---
export default function Services() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative min-h-screen bg-transparent text-zinc-50 overflow-hidden flex flex-col lg:flex-row">

            {/* LEFT PANE: Sticky 3D Viewport */}
            <div className="w-full lg:w-1/2 h-[40vh] lg:h-screen sticky top-0 z-0">
                {/* A subtle gradient overlay to blend the 3D scene with the background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950/80 z-10 pointer-events-none lg:block hidden" />

                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
                    <directionalLight position={[-5, -5, -2]} intensity={1} color="#52525b" />

                    <ServiceArtifact activeIndex={activeIndex} />

                    {/* Creates a realistic shadow beneath the floating objects */}
                    <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#000000" />
                    <Environment preset="city" />
                </Canvas>
            </div>

            {/* RIGHT PANE: Editorial Accordion (Ultra-readable) */}
            <div className="w-full lg:w-1/2 relative z-10 bg-zinc-950/80 backdrop-blur-2xl lg:bg-transparent lg:backdrop-blur-none py-24 px-6 md:px-16 lg:py-32 flex flex-col justify-center">

                <div className="mb-16">
                    <p className="font-mono text-zinc-500 mb-4 tracking-widest uppercase text-sm">
                        // Our Capabilities
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-white">
                        Aesthetic rigor. <br />
                        <span className="text-zinc-600">Technical depth.</span>
                    </h2>
                </div>

                <div className="flex flex-col w-full border-t border-white/10">
                    {services.map((service, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <div
                                key={service.id}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => setActiveIndex(index)}
                                className="group relative border-b border-white/10 py-8 md:py-12 cursor-pointer"
                            >
                                {/* Title Row */}
                                <div className="flex items-start md:items-center gap-6 md:gap-12">
                                    <span className={`text-xl md:text-3xl font-mono transition-colors duration-500 ${isActive ? "text-white" : "text-zinc-700"}`}>
                                        {service.id}
                                    </span>
                                    <h3 className={`text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-500 ${isActive ? "text-white" : "text-zinc-600"}`}>
                                        {service.title}
                                    </h3>
                                </div>

                                {/* Expanding Description (Accordion effect) */}
                                <AnimatePresence initial={false}>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-8 pl-0 md:pl-[5.5rem] flex flex-col gap-6">
                                                <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-xl">
                                                    {service.description}
                                                </p>

                                                <div className="flex flex-wrap gap-3">
                                                    {service.deliverables.map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-4 py-2 text-xs font-mono tracking-wide text-zinc-100 bg-white/10 border border-white/10 rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <button className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white mt-4 hover:opacity-70 transition-opacity w-fit">
                                                    View Architecture
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}