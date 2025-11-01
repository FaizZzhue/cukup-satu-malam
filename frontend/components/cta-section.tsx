"use client"

import { motion } from "framer-motion"

export default function CTASection() {
  return (
    <section id="cta" className="mt-14 text-center">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white">Start your personalized roadmap today</h3>
        <a
          href="#start"
          className="mt-6 inline-block rounded-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 transition shadow-[0_10px_40px_rgba(59,130,246,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/50"
        >
          Get Started
        </a>
      </motion.div>
    </section>
  )
}
