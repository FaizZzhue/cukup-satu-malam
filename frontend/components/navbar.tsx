"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { label: "Features", href: "#features" },
        { label: "How it Works", href: "#how-it-works" },
    ]

    return (
        <nav className="flex items-center justify-between py-4 md:py-6 border-b border-white/10">
            <div className="text-2xl font-extrabold text-white">PathbyU</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="text-white/80 hover:text-white transition-colors duration-300"
                    >
                        {item.label}
                    </a>
                ))}
                <Link href="/login">
                    <button className="btn-primary-sm">Sign Up</button>
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 text-white z-50 relative"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            <div 
            className={cn(
                "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-start",
                "transition-all duration-300 md:hidden",
                isOpen 
                ? "opacity-100 pointer-events-auto " 
                : "opacity-0 pointer-events-none"
            )}
                >
                <div className="absolute top-16 flex flex-col space-y-8 text-xl">
                    {navItems.map((item, key) => (
                        <a 
                            key={key} 
                            href={item.href} 
                            className="text-foreground/80 hover:text-primary transition-color duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}