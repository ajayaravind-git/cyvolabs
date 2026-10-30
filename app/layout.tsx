import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FluidBackground from "@/components/FluidBackground";
import Footer from "@/components/Footer"; // 1. Imported the Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CYVO | Digital Agency & Software Studio",
  description: "High-fidelity studio building ultra-premium digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark lenis lenis-smooth">
      {/* 2. Added min-h-screen and flex flex-col to ground the footer */}
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 pt-20 min-h-screen flex flex-col`}>

        {/* The 3D WebGL Background (Fixed beneath everything) */}
        <FluidBackground />

        {/* 3. Added flex flex-col and flex-grow to stretch the wrapper */}
        <div className="relative z-10 flex flex-col flex-grow">
          <Navbar />

          {/* 4. flex-grow on the main element pushes the footer down */}
          <main className="flex-grow">
            {children}
          </main>

          {/* 5. Injected the universal Footer */}
          <Footer />
        </div>

      </body>
    </html>
  );
}