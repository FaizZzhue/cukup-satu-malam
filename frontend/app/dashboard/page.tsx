"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Home,
  Target,
  LogOut,
  Plus,
  Trash2,
  Edit,
  TrendingUp,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function DashboardPage() {
  const [active, setActive] = useState("Home")
  const [milestones, setMilestones] = useState([
    { id: 1, title: "Master design tools (Figma, Adobe)", progress: 80 },
    { id: 2, title: "Build 3 UI/UX projects", progress: 60 },
    { id: 3, title: "Join freelance design work", progress: 20 },
  ])
  const [newMilestone, setNewMilestone] = useState("")

  const handleAdd = () => {
    if (!newMilestone.trim()) return
    const newItem = { id: Date.now(), title: newMilestone, progress: 0 }
    setMilestones([...milestones, newItem])
    setNewMilestone("")
  }

  const handleDelete = (id: number) => {
    setMilestones(milestones.filter((m) => m.id !== id))
  }

  const data = milestones.map((m) => ({
    name: m.title.length > 15 ? m.title.slice(0, 15) + "..." : m.title,
    progress: m.progress,
  }))

  const menu = [
    { name: "Home", icon: Home },
    { name: "Roadmap", icon: Target },
  ]

  return (
    <main className="min-h-screen flex flex-col md:flex-row text-white bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="md:w-64 w-full md:h-screen bg-white/10 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between p-6 md:fixed rounded-r-3xl"
      >
        <div>
          <h2 className="text-2xl font-extrabold mb-10 text-center tracking-wide">
            PathByU
          </h2>
          <nav className="flex flex-col gap-3">
            {menu.map((item) => {
              const Icon = item.icon
              const isActive = active === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => setActive(item.name)}
                  className={`flex items-center gap-3 text-sm font-medium rounded-xl px-4 py-3 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md scale-[1.03]"
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
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-medium transition-all border border-white/10"
        >
          <LogOut size={16} /> Keluar
        </Link>
      </motion.aside>

      {/* MAIN CONTENT */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 md:ml-64 px-6 md:px-10 py-12"
      >
        {active === "Home" && (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">
                Selamat Datang, Faiz 👋
              </h1>
              <p className="text-white/70 text-sm">
                Ringkasan perjalanan akademikmu dimulai dari sini
              </p>
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: <TrendingUp className="w-4 h-4 text-sky-400" />,
                  label: "Nama",
                  value: "Faiz",
                  color: "text-sky-300",
                },
                {
                  icon: <GraduationCap className="w-4 h-4 text-green-400" />,
                  label: "Jurusan",
                  value: "Informatika",
                  color: "text-green-300",
                  sub: "Semester 5",
                },
                {
                  icon: <Target className="w-4 h-4 text-purple-400" />,
                  label: "Goal Utama",
                  value: "UI/UX Designer",
                  color: "text-purple-300",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/15 rounded-2xl p-5 shadow-lg text-center hover:bg-white/15 transition-all"
                >
                  <p className="text-sm text-white/70 flex justify-center items-center gap-2">
                    {item.icon} {item.label}
                  </p>
                  <h2
                    className={`text-3xl font-bold mt-2 ${item.color}`}
                  >
                    {item.value}
                  </h2>
                  {item.sub && (
                    <p className="text-xs text-white/50 mt-1">{item.sub}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Profil */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/10 border border-white/15 rounded-2xl p-6 shadow-inner">
                <h3 className="text-lg font-semibold mb-3 border-b border-white/10 pb-2">
                  Profil Pembelajaran
                </h3>
                <ul className="text-sm space-y-1">
                  <li>
                    <span className="text-white/50">Gaya Kerja:</span>{" "}
                    <span className="font-semibold">Kolaboratif</span>
                  </li>
                  <li>
                    <span className="text-white/50">Gaya Belajar:</span>{" "}
                    <span className="font-semibold">Praktik Langsung</span>
                  </li>
                  <li>
                    <span className="text-white/50">Bidang Unggulan:</span>{" "}
                    <span className="font-semibold">Analisis & Desain</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 border border-white/15 rounded-2xl p-6 shadow-inner">
                <h3 className="text-lg font-semibold mb-3 border-b border-white/10 pb-2">
                  Tujuan Akademik
                </h3>
                <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
                  <li>Meningkatkan kemampuan desain UI/UX</li>
                  <li>Menjadi desainer profesional</li>
                </ul>
              </div>
            </div>

            {/* Grafik */}
            <div className="bg-white/10 border border-white/15 rounded-3xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-sky-400" /> Visualisasi Progress Roadmap
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.08)"
                  />
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.7)",
                      border: "none",
                      borderRadius: "10px",
                      color: "white",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#38bdf8" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* ROADMAP PAGE */}
        {active === "Roadmap" && (
          <div className="bg-white/10 border border-white/15 rounded-3xl p-6 shadow-lg flex flex-col max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              🗺️ Atur Roadmap
            </h2>

            {/* Input Add */}
            <div className="flex gap-2 mb-5">
              <input
                type="text"
                value={newMilestone}
                onChange={(e) => setNewMilestone(e.target.value)}
                placeholder="Tambahkan milestone..."
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                onClick={handleAdd}
                className="bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-sky-600 transition-all"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Daftar milestone */}
            <div className="flex-1 overflow-y-auto custom-scroll space-y-3">
              {milestones.length === 0 ? (
                <p className="text-white/50 text-sm text-center">
                  Belum ada milestone.
                </p>
              ) : (
                milestones.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3 text-sm hover:bg-white/10 transition-all"
                  >
                    <span className="truncate max-w-[220px]">{m.title}</span>
                    <div className="flex gap-3">
                      <button className="text-white/70 hover:text-yellow-400 transition">
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="text-white/70 hover:text-red-400 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <footer className="text-center text-white/50 text-sm mt-12">
          © 2025 PathByU 🎓
        </footer>
      </motion.section>
    </main>
  )
}
