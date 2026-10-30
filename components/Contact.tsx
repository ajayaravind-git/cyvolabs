"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, MapPin, Loader2, Send, Phone } from "lucide-react"; // Added Phone icon

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        // 🚨 PASTE YOUR EXISTING WEB3FORMS ACCESS KEY HERE 🚨
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
                    // Reset the form fields after success
                    (e.target as HTMLFormElement).reset();
                }, 4000); // Shows the success message for 4 seconds
            }
        } catch (error) {
            console.error("Error submitting form", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">

                {/* Left Column: Text & Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col justify-center"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-zinc-50 mb-6">
                        Let's build <br />
                        <span className="text-zinc-500">together.</span>
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-md font-light mb-12">
                        Have a project in mind? We partner with ambitious brands to engineer exceptional digital experiences.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                <Mail className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-zinc-300">Email Us</p>
                                <a href="mailto:hello@cyvostudio.com" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                                    hello@cyvostudio.com
                                </a>
                            </div>
                        </div>

                        {/* NEW: Company Phone Number Display */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                <Phone className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-zinc-300">Call Us</p>
                                <a href="tel:+15551234567" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                                    +1 (555) 123-4567
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-zinc-300">Studio</p>
                                <p className="text-zinc-500">San Francisco, CA</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Glassmorphic Form container */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Form Background Glow */}
                    <div className="absolute inset-0 -z-10 bg-zinc-800/10 rounded-3xl blur-2xl" />

                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-md flex flex-col items-center justify-center text-center h-full min-h-[500px]"
                            >
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                                    <Send className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-2">Message Sent.</h4>
                                <p className="text-zinc-400">Our engineering team will review your inquiry and reach out shortly.</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-md flex flex-col gap-6"
                            >
                                {/* Web3Forms Hidden Routing Inputs */}
                                <input type="hidden" name="subject" value="New Contact Page Submission" />
                                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                                {/* Row 1: Name and Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="text-sm font-medium text-zinc-400 ml-1">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="John Doe"
                                            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-sm font-medium text-zinc-400 ml-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            placeholder="john@example.com"
                                            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* NEW Row 2: Phone and Project Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-zinc-400 ml-1">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="project" className="text-sm font-medium text-zinc-400 ml-1">Project Type</label>
                                        <select
                                            id="project"
                                            name="project_type"
                                            required
                                            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all appearance-none"
                                        >
                                            <option value="" className="bg-zinc-900">Select a project type</option>
                                            <option value="Web Application" className="bg-zinc-900">Web Application</option>
                                            <option value="Mobile Application" className="bg-zinc-900">Mobile Application</option>
                                            <option value="UI/UX Design" className="bg-zinc-900">UI/UX Design</option>
                                            <option value="Other" className="bg-zinc-900">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 3: Message */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-sm font-medium text-zinc-400 ml-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        placeholder="Tell us about your goals..."
                                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group flex items-center justify-center gap-2 w-full py-4 mt-2 bg-zinc-50 text-zinc-950 font-semibold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Send Message
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}