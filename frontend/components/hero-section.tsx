"use client"

import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <motion.div
      className="text-center py-12 md:py-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
        Personalized Student Roadmaps
      </h1>
      <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl mx-auto">
        Create and track your own roadmap for academic and career success.
      </p>
      <a
        id="start"
        href="#cta"
        className="mt-8 inline-block rounded-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 transition shadow-[0_10px_40px_rgba(59,130,246,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/50"
      >
        Get Started
      </a>
    </motion.div>
  )
}
