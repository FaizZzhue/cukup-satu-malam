"use client"
import { motion } from "framer-motion"
import { Home, Target, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DashboardPage() {
  const [active, setActive] = useState("Home")
  const menu = [
    { name: "Home", icon: Home },
    { name: "Roadmap", icon: Target },
    { name: "Pengaturan", icon: Settings },
  ]

  return (
    <main className="min-h-screen flex flex-col md:flex-row text-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="md:w-64 w-full md:h-screen bg-white/10 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between p-6 md:fixed"
      >
        <div>
          <h2 className="text-2xl font-extrabold mb-8 text-center">🎓 Roadmap</h2>
          <nav className="flex flex-col gap-3">
            {menu.map((item) => {
              const Icon = item.icon
              const isActive = active === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => setActive(item.name)}
                  className={`flex items-center gap-3 text-sm font-medium rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} /> {item.name}
                </button>
              )
            })}
          </nav>
        </div>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-medium transition"
        >
          <LogOut size={16} /> Keluar
        </Link>
      </motion.aside>

      {/* Main Content */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 md:ml-64 px-6 md:px-10 py-10"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">Selamat Datang di Dashboard 🎓</h1>

        <div className="bg-white/10 border border-white/15 rounded-3xl p-6 shadow-lg backdrop-blur-2xl mb-6">
          <h2 className="text-2xl font-semibold mb-3">Profil Mahasiswa</h2>
          <p className="text-white/70">Menampilkan hasil Self-Assessment dan roadmap pribadi.</p>
        </div>

        <div className="bg-white/10 border border-white/15 rounded-3xl p-6 shadow-lg backdrop-blur-2xl">
          <h2 className="text-2xl font-semibold mb-3">Roadmap Akademik</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: "Semester 5: Fokus Mata Kuliah Inti", progress: 80 },
              { title: "Semester 6: Mulai Penelitian", progress: 40 },
              { title: "Semester 7: Persiapan Skripsi", progress: 20 },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-sm mb-1">{item.title}</p>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-sky-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="text-center text-white/60 text-sm mt-10">
          © 2025 Roadmap Mahasiswa
        </footer>
      </motion.section>
    </main>
  )
}
