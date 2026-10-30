"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        // 🚨 REPLACE THIS WITH YOUR WEB3FORMS ACCESS KEY 🚨
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY as string);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                }, 3000);
            }
        } catch (error) {
            console.error("Error submitting form", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Background Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-lg bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h3 className="text-xl font-bold text-white">Initialize Project</h3>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        {isSuccess ? (
                            <div className="p-12 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                                    <Send className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-2">Transmission Sent.</h4>
                                <p className="text-zinc-400">Our engineering team will review your requirements and reach out shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                                {/* Hidden subjects/redirects for Web3Forms */}
                                <input type="hidden" name="subject" value="New CYVO Project Inquiry" />
                                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-mono tracking-widest uppercase text-zinc-500">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 focus:bg-white/10 transition-colors"
                                            placeholder="Bruce Wayne"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-mono tracking-widest uppercase text-zinc-500">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 focus:bg-white/10 transition-colors"
                                            placeholder="bruce@wayne.com"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-mono tracking-widest uppercase text-zinc-500">Estimated Budget</label>
                                    <select name="budget" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 appearance-none">
                                        <option value="Not specified" className="bg-zinc-900 text-white">Select a range...</option>
                                        <option value="₹10k - ₹25k" className="bg-zinc-900 text-white">₹10,000 - ₹25,000</option>
                                        <option value="₹25k - ₹50k" className="bg-zinc-900 text-white">₹25,000 - ₹50,000</option>
                                        <option value="₹50k+" className="bg-zinc-900 text-white">₹50,000+</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-mono tracking-widest uppercase text-zinc-500">Project Scope</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 focus:bg-white/10 transition-colors resize-none"
                                        placeholder="Describe your operational requirements and technical goals..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-2 w-full py-4 bg-white text-zinc-950 rounded-xl font-bold tracking-wide hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>Deploy Request <Send className="w-4 h-4" /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}