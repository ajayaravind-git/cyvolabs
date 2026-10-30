"use client";

import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import KineticCore from "./ui/KineticCore";
import ProjectModal from "./ProjectModal";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Tie the typography to the scroll bar for a slick parallax effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Push the text down and fade it out as you scroll down
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">

            {/* 3D WEBGL LAYER */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* FIXED: Cast containerRef to any to bypass the strict null-check TS error */}
                <Canvas eventSource={containerRef as any} eventPrefix="client">
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
                    <directionalLight position={[-10, -10, -5]} intensity={1} color="#a1a1aa" />

                    <KineticCore />

                    {/* We need an environment map to give the metal something to reflect */}
                    <Environment preset="studio" />
                </Canvas>
            </div>

            {/* TYPOGRAPHY & UI LAYER (Sits on top, tracks scroll) */}
            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="relative z-10 text-center flex flex-col items-center pointer-events-auto px-6"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/40 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300 mb-8 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-50 animate-pulse" />
                        CYVO Digital Agency
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white drop-shadow-2xl">
                        BUILD THE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-600">
                            IMPOSSIBLE.
                        </span>
                    </h1>

                    {/* VOLUMETRIC TEXT SHIELD & FLOATING ANIMATION */}
                    <motion.div
                        className="relative mt-8 max-w-2xl mx-auto"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* The "Eclipse" Glow: Blurred shadow for contrast */}
                        <div className="absolute inset-0 bg-black/60 blur-3xl scale-[1.5] pointer-events-none rounded-full" />

                        {/* The Typography: Bumped brightness and intense drop shadow */}
                        <p className="relative z-10 text-lg md:text-xl text-zinc-200 font-normal tracking-wide leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
                            High-fidelity software architectures and immersive digital
                            experiences for ambitious brands scaling to the edge.
                        </p>
                    </motion.div>

                    <div className="mt-12 flex items-center justify-center gap-6 relative z-10">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-4 bg-zinc-50 text-zinc-950 rounded-full font-semibold tracking-wide hover:bg-zinc-200 transition-colors"
                        >
                            Initialize Project
                        </button>
                        <button className="px-8 py-4 bg-zinc-900/50 backdrop-blur-md text-zinc-50 border border-white/10 rounded-full font-semibold tracking-wide hover:bg-zinc-800 transition-colors">
                            Explore Stack
                        </button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Injected the Modal */}
            <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </section>
    );
}