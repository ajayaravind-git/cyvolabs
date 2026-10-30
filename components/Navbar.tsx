"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-bold tracking-tighter text-zinc-50 relative z-50">
                        CYVO<span className="text-zinc-500">.</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/services" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">
                            Services
                        </Link>
                        <Link href="/products" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">
                            Products
                        </Link>
                        <Link href="/studio" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">
                            Studio
                        </Link>
                        {/* Added About Link */}
                        <Link href="/about" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">
                            About
                        </Link>
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4 relative z-50">
                        <Link
                            href="/contact"
                            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-zinc-950 bg-zinc-50 hover:bg-zinc-200 rounded-full transition-colors"
                        >
                            Start a Project
                        </Link>

                        {/* Mobile Menu Button - Now wired up to toggle state */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-zinc-400 hover:text-zinc-50 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Navigation Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-20 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800/50 md:hidden flex flex-col px-6 py-8"
                    >
                        <nav className="flex flex-col gap-6">
                            <Link href="/services" onClick={() => setIsOpen(false)} className="text-2xl font-medium text-zinc-400 hover:text-zinc-50 transition-colors">
                                Services
                            </Link>
                            <Link href="/products" onClick={() => setIsOpen(false)} className="text-2xl font-medium text-zinc-400 hover:text-zinc-50 transition-colors">
                                Products
                            </Link>
                            <Link href="/studio" onClick={() => setIsOpen(false)} className="text-2xl font-medium text-zinc-400 hover:text-zinc-50 transition-colors">
                                Studio
                            </Link>
                            {/* Added About Link for Mobile */}
                            <Link href="/about" onClick={() => setIsOpen(false)} className="text-2xl font-medium text-zinc-400 hover:text-zinc-50 transition-colors">
                                About
                            </Link>
                        </nav>

                        <div className="mt-8 pt-8 border-t border-zinc-800/50">
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center justify-center w-full px-5 py-3.5 text-base font-medium text-zinc-950 bg-zinc-50 hover:bg-zinc-200 rounded-full transition-colors"
                            >
                                Start a Project
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}