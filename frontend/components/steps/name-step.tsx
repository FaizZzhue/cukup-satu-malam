"use client"
import { motion } from "framer-motion"

export default function NameStep({ name, setName }: any) {
  return (
    <motion.div
      key="nama"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Masukkan Nama</h2>
      <p className="text-white/70 text-center mb-6">Silakan isi nama lengkapmu.</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama Lengkap"
        required
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </motion.div>
  )
}
