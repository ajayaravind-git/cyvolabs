"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const products = [
    {
        id: "01",
        name: "Cyner",
        badge: "Core Engine",
        description: "The foundational engine for high-performance landing pages and immersive digital portfolios.",
        features: ["Next.js", "WebGL", "Framer Motion"],
    },
    {
        id: "02",
        name: "Cyner PRO",
        badge: "Flagship",
        description: "Advanced architectures featuring complex state management, custom headless CMS, and elite SEO performance.",
        features: ["Headless CMS", "Advanced Analytics", "Elite SEO"],
    },
    {
        id: "03",
        name: "CyCommerce",
        badge: "Retail OS",
        description: "High-conversion headless e-commerce interfaces built for massive scale, sub-second speeds, and global checkout.",
        features: ["Stripe Integration", "Shopify Plus", "Dynamic Inventory"],
    }
];

export default function Products() {
    // Track which row is hovered to dim the others
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-32 bg-transparent text-zinc-50 relative overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full mb-20">

                {/* Minimalist Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                    <div>
                        <p className="font-mono text-zinc-500 mb-4 tracking-widest uppercase text-sm">
              // Proprietary Ecosystem
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                            Engineered for <br className="hidden md:block" />
                            <span className="text-zinc-600">absolute scale.</span>
                        </h2>
                    </div>
                </motion.div>
            </div>

            {/* Full-Width Interactive List */}
            <div className="w-full border-t border-white/10 relative z-10">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="group relative border-b border-white/10 transition-colors duration-500"
                    >
                        {/* Hover Glass Backdrop */}
                        <div
                            className={`absolute inset-0 bg-zinc-900/40 backdrop-blur-md transition-opacity duration-500 pointer-events-none
                ${hoveredIndex === index ? "opacity-100" : "opacity-0"}
              `}
                        />

                        <div
                            className={`relative max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center transition-all duration-500
                ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-30 blur-[2px] grayscale" : "opacity-100 blur-0"}
              `}
                        >
                            {/* Col 1: Index & Badge */}
                            <div className="md:col-span-3 flex flex-col gap-2">
                                <span className="text-sm font-mono text-zinc-500 tracking-widest">
                                    {product.id}
                                </span>
                                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                                    {product.badge}
                                </span>
                            </div>

                            {/* Col 2: Massive Typography Name */}
                            <div className="md:col-span-5">
                                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-300 group-hover:text-white transition-colors duration-500 group-hover:translate-x-4 transform">
                                    {product.name}
                                </h3>
                            </div>

                            {/* Col 3: Description, Tech, and CTA */}
                            <div className="md:col-span-4 flex flex-col items-start md:items-end md:text-right gap-6">
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm">
                                    {product.description}
                                </p>

                                {/* Tech Stack Pills */}
                                <div className="flex flex-wrap gap-2 md:justify-end">
                                    {product.features.map((feature, fIndex) => (
                                        <span
                                            key={fIndex}
                                            className="px-3 py-1 text-[10px] md:text-xs font-mono tracking-wide text-zinc-500 bg-white/5 border border-white/10 rounded-full group-hover:border-zinc-500 transition-colors duration-500"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Animated Arrow */}
                                <div className="hidden md:flex w-12 h-12 rounded-full border border-white/10 items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 mt-4 group-hover:-translate-y-2 group-hover:translate-x-2">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}