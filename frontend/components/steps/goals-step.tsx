"use client"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"

export default function GoalsStep({ goals, setGoals, customRoadmap, setCustomRoadmap }: any) {
  const addGoal = () => setGoals([...goals, ""])
  const handleGoalChange = (i: number, v: string) => {
    const updated = [...goals]
    updated[i] = v
    setGoals(updated)
  }

  return (
    <motion.div
      key="goals"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Goals & Kustomisasi Roadmap</h2>
      <p className="text-white/70 text-center mb-6">Tambahkan tujuan utama kamu (minimal 1).</p>
      {goals.map((goal, i) => (
        <input
          key={i}
          type="text"
          required={i === 0}
          value={goal}
          onChange={(e) => handleGoalChange(i, e.target.value)}
          placeholder={`Tujuan ${i + 1}`}
          className="w-full mb-3 p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      ))}
      <button onClick={addGoal} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
        <Plus size={16} /> Tambah Goal Opsional
      </button>

      <p className="mb-3 text-white/70 text-center">Kustomisasi Roadmap</p>
      <textarea
        rows={3}
        value={customRoadmap}
        onChange={(e) => setCustomRoadmap(e.target.value)}
        placeholder="Tulis rencana atau strategi belajarmu"
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </motion.div>
  )
}
