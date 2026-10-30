"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-white/10 bg-zinc-950 pt-20 pb-10 overflow-hidden z-20">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-zinc-800/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* Top Section: Massive CTA */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
                            Ready to <br />
                            <span className="text-zinc-600">initialize?</span>
                        </h2>
                        <p className="text-zinc-400 text-lg font-light max-w-sm">
                            Partner with CYVO to engineer your next digital architecture.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="group flex items-center gap-4 px-8 py-4 bg-white text-zinc-950 rounded-full font-bold tracking-wide hover:bg-zinc-200 transition-colors"
                    >
                        Start a Project
                        <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                    </Link>
                </div>

                {/* Middle Section: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 pt-12 border-t border-white/10">
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-zinc-50">
                            CYVO<span className="text-zinc-500">.</span>
                        </Link>
                        <p className="text-sm text-zinc-500 font-medium">
                            San Francisco, CA <br />
                            hello@cyvostudio.com
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-mono tracking-widest uppercase text-zinc-100 mb-2">Index</h4>
                        <Link href="/services" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Services</Link>
                        <Link href="/products" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Products</Link>
                        <Link href="/studio" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Studio</Link>
                        <Link href="/about" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">About</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-mono tracking-widest uppercase text-zinc-100 mb-2">Socials</h4>
                        <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Twitter / X</a>
                        <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">LinkedIn</a>
                        <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Instagram</a>
                        <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">GitHub</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-mono tracking-widest uppercase text-zinc-100 mb-2">Legal</h4>
                        <Link href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link>
                        <Link href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Terms of Service</Link>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-sm font-medium text-zinc-600">
                    <p>© {currentYear} CYVO Digital Agency. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span>Engineered in</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>SF</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}