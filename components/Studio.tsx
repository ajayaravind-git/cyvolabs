"use client";

import { motion, useMotionTemplate, useMotionValue, Variants } from "framer-motion"; // FIXED: Imported Variants
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import {
    MonitorSmartphone,
    Layers,
    Terminal,
    ShieldCheck,
    Database,
    Cpu,
    Code2,
    Smartphone,
    Zap
} from "lucide-react";

// --- 1. PREMIUM 3D ELEMENT (The "Optical Lens") ---
// No more wireframes. This is a highly polished, refractive glass sculpture.
function OpticalLens() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.1;
            meshRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} scale={1.4}>
                <torusGeometry args={[1, 0.4, 64, 128]} />
                <meshPhysicalMaterial
                    transmission={1} // Makes it look like pure glass
                    ior={1.4} // Index of refraction (bends light)
                    thickness={1.5}
                    roughness={0.05} // Ultra smooth
                    color="#ffffff"
                    clearcoat={1}
                />
            </mesh>
        </Float>
    );
}

// --- 2. THE SPOTLIGHT CARD COMPONENT ---
// This creates the ultra-premium "glow follows the cursor" effect
function SpotlightCard({ children, className, featured }: { children: React.ReactNode, className: string, featured: boolean }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            className={`group relative overflow-hidden rounded-[2rem] border transition-colors duration-500 backdrop-blur-xl
                ${featured
                    ? "bg-zinc-900/40 border-white/10 hover:border-white/20"
                    : "bg-zinc-950/40 border-white/5 hover:border-white/10"
                } ${className}`}
        >
            {/* The invisible mouse-tracking glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100 z-0"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            ${featured ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'},
                            transparent 80%
                        )
                    `,
                }}
            />
            {/* The actual content of the card */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8">
                {children}
            </div>
        </div>
    );
}

// --- 3. YOUR EXACT DATA ---
const techVault = [
    { name: "React / Next.js", category: "Web Core", count: "42", icon: <Layers className="w-5 h-5" />, colSpan: "md:col-span-2", featured: true },
    { name: "React Native", category: "Mobile Systems", count: "18", icon: <Smartphone className="w-5 h-5" />, colSpan: "md:col-span-1", featured: false },
    { name: "Electron", category: "Desktop Clients", count: "11", icon: <MonitorSmartphone className="w-5 h-5" />, colSpan: "md:col-span-1", featured: false },
    { name: "Playwright", category: "QA Automation", count: "27", icon: <ShieldCheck className="w-5 h-5" />, colSpan: "md:col-span-2", featured: false },
    { name: "JavaScript", category: "Logic & Scripting", count: "85", icon: <Terminal className="w-5 h-5" />, colSpan: "md:col-span-1", featured: false },
    { name: "Tailwind CSS", category: "Styling Engine", count: "56", icon: <Code2 className="w-5 h-5" />, colSpan: "md:col-span-1", featured: false },
    { name: "Framer Motion", category: "Kinematics", count: "34", icon: <Zap className="w-5 h-5" />, colSpan: "md:col-span-1", featured: false },
    { name: "SQL", category: "Data Architecture", count: "21", icon: <Database className="w-5 h-5" />, colSpan: "md:col-span-1", featured: false },
    { name: "System Design", category: "Infrastructure", count: "14", icon: <Cpu className="w-5 h-5" />, colSpan: "md:col-span-2", featured: true },
];

// FIXED: Applied Variants type to satisfy TypeScript
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// FIXED: Applied Variants type to satisfy TypeScript
const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 20 } }
};

export default function Studio() {
    return (
        <section className="py-32 bg-transparent text-zinc-50 relative overflow-hidden min-h-screen">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* --- HEADER --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 md:mb-32 flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/40 backdrop-blur-md border border-white/5 text-xs font-medium text-zinc-300 mb-6 uppercase tracking-widest shadow-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        The Studio
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                        Engineering <span className="text-zinc-600">Excellence.</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl text-lg md:text-xl font-light tracking-wide leading-relaxed">
                        Bridging the gap between premium visual aesthetics and heavy-duty technical infrastructure.
                    </p>
                </motion.div>

                {/* --- INTRO & 3D LENS --- */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="md:col-span-4"
                    >
                        <h3 className="text-3xl font-bold tracking-tight text-zinc-100 mb-3">Ecosystem</h3>
                        <p className="text-zinc-500 font-medium tracking-wide text-sm uppercase">Cross-Platform Unified Stack</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="md:col-span-5"
                    >
                        <p className="text-xl md:text-2xl font-light text-zinc-300 leading-snug">
                            We build scalable platforms tailored perfectly to operational needs. We deploy everywhere, and test everything.
                        </p>
                    </motion.div>

                    {/* The Elegant 3D Glass Lens */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="md:col-span-3 h-48 relative hidden md:block pointer-events-none"
                    >
                        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                            <ambientLight intensity={1} />
                            <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
                            <OpticalLens />
                            <Environment preset="city" />
                        </Canvas>
                    </motion.div>
                </div>

                {/* --- THE STACK VAULT --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {techVault.map((tech, index) => (
                        <motion.div key={index} variants={itemVariants} className={tech.colSpan}>
                            {/* We wrap your exact grid mapping in the new Spotlight component */}
                            <SpotlightCard featured={tech.featured} className="h-full min-h-[220px]">

                                {/* Top Row */}
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`p-3 rounded-2xl border shadow-lg transition-colors duration-500 ${tech.featured ? "bg-white/10 border-white/10 text-white" : "bg-white/5 border-transparent text-zinc-400 group-hover:text-zinc-200"
                                        }`}>
                                        {tech.icon}
                                    </div>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                        {tech.category}
                                    </p>
                                </div>

                                {/* Bottom Row */}
                                <div className="mt-auto">
                                    <h4 className={`text-xl font-bold tracking-tight mb-4 transition-colors ${tech.featured ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                                        {tech.name}
                                    </h4>

                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-3xl font-medium tracking-tighter ${tech.featured ? "text-zinc-200" : "text-zinc-400"}`}>
                                            {tech.count}
                                        </span>
                                        <span className="text-xs font-medium tracking-wide text-zinc-600">
                                            Projects
                                        </span>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}