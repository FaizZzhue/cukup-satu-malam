"use client"

import { useState } from "react"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"


export default function SignUpPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState ("")

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (email === "student@example.com" && password === "123456") {
        setMessage("Login successful! Welcome Student 🎓")
    } else {
        setMessage("Invalid email or password")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="mx-auto max-w-6xl lg:max-w-7xl px-6 md:px-10 py-10 md:py-12 text-center glass-card">
                <div className="flex flex-wrap items-center gap-2md:flex-row text-white py-6">
                    <Link href="/">
                        <ArrowLeftIcon/>
                    </Link>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome Student</h1>
                <p className="text-white/80 text-lg mb-8">
                    Sign in to access your personalized roadmap.
                </p>

                {/* Form Login */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                    <div>
                        <label className="block text-white/80 mb-2 text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-white/80 mb-2 text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••"
                            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-full py-3 rounded-lg font-semibold mt-4"
                    >
                        Sign Up
                    </button>

                    <Link
                        href="/login"
                        className="w-full rounded-lg font-semibold text-white text-center"
                    >
                        Sign In
                    </Link>

                </form>

                {message && (
                    <p
                        className={`mt-6 text-sm font-medium ${
                        message.includes("") ? "text-green-400" : "text-red-400"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}