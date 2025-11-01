"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Brain, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface GoalsStepProps {
  goals: string[]
  setGoals: (value: string[]) => void
  customRoadmap: string
  setCustomRoadmap: (value: string) => void
  assessment: Record<number, string>
  onNext: () => void
  onBack: () => void
}

export default function GoalsStep({
  goals,
  setGoals,
  customRoadmap,
  setCustomRoadmap,
  assessment,
  onNext,
  onBack,
}: GoalsStepProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const addGoal = () => setGoals([...goals, ""])
  const handleGoalChange = (i: number, v: string) => {
    const updated = [...goals]
    updated[i] = v
    setGoals(updated)
  }

  const isAssessmentComplete =
    assessment && Object.keys(assessment).length === 10

  const handleSkip = () => {
    router.push("/dashboard")
  }

  const handleAnalyze = async () => {
    if (!isAssessmentComplete) {
      setError("Harap isi seluruh pertanyaan self-assessment sebelum lanjut.")
      return
    }
    setError("")
    setLoading(true)
    // beri sedikit delay agar muncul animasi "loading"
    setTimeout(() => {
      setLoading(false)
      onNext() // ⬅️ pindah ke AnalysisStep
    }, 1200)
  }

  return (
    <motion.div
      key="goals"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.4 }}
      className="text-white"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Goals & Kustomisasi Roadmap
      </h2>
      <p className="text-white/70 text-center mb-6">
        Tambahkan tujuan utama kamu (minimal 1).
      </p>

      {goals.map((goal, i) => (
        <input
          key={i}
          type="text"
          required={i === 0}
          value={goal}
          onChange={(e) => handleGoalChange(i, e.target.value)}
          placeholder={`Tujuan ${i + 1}`}
          className="w-full mb-3 p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-white/40"
        />
      ))}

      <button
        onClick={addGoal}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4 text-sm"
      >
        <Plus size={16} /> Tambah Goal Opsional
      </button>

      <p className="mb-3 text-white/70 text-center font-medium">
        Kustomisasi Roadmap
      </p>
      <textarea
        rows={3}
        value={customRoadmap}
        onChange={(e) => setCustomRoadmap(e.target.value)}
        placeholder="Tulis rencana atau strategi belajarmu"
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-white/40 mb-6"
      />

      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-red-400 text-sm text-center mb-4"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-2 text-white/70 hover:text-white transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            disabled={loading}
            className="rounded-full px-5 py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 transition disabled:opacity-50"
          >
            Lewati Analisis
          </button>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`flex items-center gap-2 rounded-full px-6 py-2 font-semibold bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <span className="animate-spin border-2 border-white/30 border-t-white rounded-full w-4 h-4" />
                Menganalisis...
              </>
            ) : (
              <>
                Lanjutkan <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
