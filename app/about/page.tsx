"use client";

import { motion, Variants } from "framer-motion"; // FIXED: Imported Variants type
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { ArrowUpRight } from "lucide-react";

// --- 1. THE 3D ELEMENT (The "Precision Rings") ---
function PrecisionRings() {
    const ring1 = useRef<THREE.Mesh>(null);
    const ring2 = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (ring1.current) {
            ring1.current.rotation.x += delta * 0.2;
            ring1.current.rotation.y += delta * 0.1;
        }
        if (ring2.current) {
            ring2.current.rotation.x -= delta * 0.15;
            ring2.current.rotation.y -= delta * 0.25;
        }
    });

    return (
        <Float floatIntensity={1} rotationIntensity={0.5} speed={1.5}>
            {/* Outer Ring */}
            <mesh ref={ring1}>
                <torusGeometry args={[1.5, 0.015, 32, 100]} />
                <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
            </mesh>

            {/* Inner Ring */}
            <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.1, 0.03, 32, 100]} />
                <meshPhysicalMaterial color="#a1a1aa" metalness={1} roughness={0.1} clearcoat={1} />
            </mesh>
        </Float>
    );
}

// --- 2. PLACEHOLDER DATA ---
const stats = [
    { label: "Founded", value: "2024" },
    { label: "Global Clients", value: "40+" },
    { label: "Team Members", value: "12" },
    { label: "Awards Won", value: "05" },
];

const team = [
    { name: "John Doe", role: "Founder & Technical Director" },
    { name: "Jane Smith", role: "Head of Design Engineering" },
    { name: "Alex Johnson", role: "Lead WebGL Developer" },
    { name: "Sarah Williams", role: "Operations Lead" },
];

// FIXED: Applied the Variants type to satisfy TypeScript strictness
const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function About() {
    return (
        <main className="min-h-screen bg-transparent text-zinc-50 pt-32 pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* --- HERO SECTION --- */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={fadeUpVariants}
                    className="mb-24 md:mb-40"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/40 backdrop-blur-md border border-white/5 text-xs font-medium text-zinc-300 mb-8 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        About CYVO
                    </div>

                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white">
                        DESIGNING <br />
                        <span className="text-zinc-600">THE UNSEEN.</span>
                    </h1>
                </motion.div>

                {/* --- ETHOS & 3D SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-32 items-center border-t border-white/10 pt-16">

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUpVariants}
                        className="lg:col-span-5"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                            We don't just build websites. We architect digital infrastructure.
                        </h2>
                        <p className="text-lg text-zinc-400 leading-relaxed font-light mb-8">
                            Based strictly in the digital realm, CYVO was founded on a simple principle: the web has become boring, and it doesn't have to be. We merge high-fidelity visual design with relentless software engineering to create products that perform as beautifully as they look.
                        </p>
                        <p className="text-lg text-zinc-400 leading-relaxed font-light">
                            Whether it is a global e-commerce platform or an immersive WebGL portfolio, our mandate is absolute scale, speed, and precision.
                        </p>
                    </motion.div>

                    {/* The 3D Precision Rings */}
                    <div className="lg:col-span-7 h-[400px] w-full relative pointer-events-none hidden md:block">
                        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
                            <directionalLight position={[-5, -5, -2]} intensity={1} color="#52525b" />
                            <PrecisionRings />
                            <Environment preset="city" />
                        </Canvas>
                    </div>
                </div>

                {/* --- STATS GRID --- */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        show: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUpVariants}
                            className="p-8 rounded-[2rem] bg-zinc-900/20 backdrop-blur-xl border border-white/5 flex flex-col justify-between h-48"
                        >
                            <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">{stat.label}</p>
                            <p className="text-5xl font-bold tracking-tighter text-white">{stat.value}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* --- LEADERSHIP / TEAM SECTION --- */}
                <div className="border-t border-white/10 pt-16">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={fadeUpVariants}
                        className="mb-12 flex justify-between items-end"
                    >
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Leadership</h2>
                            <p className="text-zinc-400 text-lg">The minds behind the architecture.</p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }
                                }}
                                className="group relative"
                            >
                                {/* Placeholder for Profile Image */}
                                <div className="w-full aspect-square bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl mb-6 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                    {/* When you have real images, drop an <img /> or next/image here */}
                                    <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                                        [ IMAGE ]
                                    </div>

                                    {/* Hover Link Icon */}
                                    <div className="absolute bottom-4 right-4 z-20 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-sm font-medium tracking-wide text-zinc-500">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}