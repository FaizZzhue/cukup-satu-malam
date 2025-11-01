"use client"
import { motion } from "framer-motion"

export default function AnalysisStep({ name, major, semester }: any) {
  return (
    <motion.div
      key="analisis"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Analisis Otomatis</h2>
      <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
        <p>
          <span className="font-semibold">Nama:</span> {name || "Belum diisi"}
        </p>
        <p>
          <span className="font-semibold">Jurusan:</span> {major || "Belum diisi"}
        </p>
        <p>
          <span className="font-semibold">Semester:</span> {semester || "Belum diisi"}
        </p>
      </div>
      <p className="mt-6 text-center text-white/70 text-sm">Sistem akan menyesuaikan roadmap berdasarkan profilmu.</p>
    </motion.div>
  )
}
