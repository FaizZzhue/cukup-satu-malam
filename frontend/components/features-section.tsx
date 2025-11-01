"use client"

import { motion } from "framer-motion"
import { List, BarChart3, Bell } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: List,
      title: "Auto-Generated Plans",
      description: "Input your major interests to generate a tailored plan.",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Stay on track with progress checklists and visualizations.",
    },
    {
      icon: Bell,
      title: "Timely Notifications",
      description: "Receive reminders for important dates and milestones.",
    },
  ]

  return (
    <section id="features" className="mt-4">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Features
      </motion.h2>

      <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={index}
              className="group text-center bg-white/8 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-white">{feature.title}</h3>
              <p className="mt-1 text-white/80 text-sm">{feature.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
