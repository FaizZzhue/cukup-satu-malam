"use client"

import { motion } from "framer-motion"

export default function HowItWorks() {
  const steps = [
    { number: 1, text: "Enter your information" },
    { number: 2, text: "Explore your roadmap" },
    { number: 3, text: "Track your progress" },
  ]

  return (
    <section id="how" className="mt-12">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center mb-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        How it Works
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-b from-blue-600 to-sky-500 text-white font-bold flex items-center justify-center shadow-lg">
              {step.number}
            </div>
            <p className="text-white/90">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
