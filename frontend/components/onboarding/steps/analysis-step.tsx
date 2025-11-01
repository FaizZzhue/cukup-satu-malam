"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Brain, Loader2, Target, TrendingUp, GraduationCap } from "lucide-react"

interface AnalysisStepProps {
  name: string
  major: string
  semester: string
  goals: string[]
  assessment: Record<number, string>
  onBack: () => void
  onNext: () => void
}

export default function AnalysisStep({
  name,
  major,
  semester,
  goals,
  assessment,
  onBack,
  onNext,
}: AnalysisStepProps) {
  const [loading, setLoading] = useState(true)
  const [aiData, setAiData] = useState<{
    summary: string
    workStyle: string
    learningStyle: string
    strength: string
    roadmap: { shortTerm: string[]; longTerm: string[] }
  } | null>(null)

  useEffect(() => {
    const analyzeWithAI = async () => {
      setLoading(true)

      // Simulasi delay AI call (ganti nanti dengan API real)
      await new Promise((r) => setTimeout(r, 2200))

      // Dummy hasil AI berdasarkan input user
      const mock = {
        summary: `Halo ${name || "Mahasiswa"}, berdasarkan jurusan ${major || "-"} semester ${
          semester || "-"
        } serta preferensi belajarmu, AI telah membuat roadmap personal.`,
        workStyle: "Kolaboratif",
        learningStyle: "Praktik Langsung",
        strength: "Kreativitas dan kemampuan menganalisis",
        roadmap: {
          shortTerm: [
            "Kuasai tools utama seperti Figma dan Adobe XD",
            "Bangun minimal 3 proyek desain UI/UX",
            "Ikuti workshop produktivitas dan komunikasi tim",
          ],
          longTerm: [
            "Bangun portofolio profesional",
            "Ikut proyek freelance dan kompetisi desain",
            "Kembangkan kemampuan leadership dan mentoring",
          ],
        },
      }

      setAiData(mock)
      setLoading(false)
    }

    analyzeWithAI()
  }, [name, major, semester, goals, assessment])

  return (
    <motion.div
      key="ai-analysis"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-white flex flex-col items-center"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">
          <Brain className="inline-block w-7 h-7 mr-2 text-sky-400" />
          Analisis AI Akademikmu
        </h2>
        <p className="text-white/60 text-sm">
          Berdasarkan data dan preferensi belajarmu, AI sedang menyusun ringkasan akademik.
        </p>
      </div>

      {/* Loading Animation */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-60 text-center">
          <Loader2 className="w-10 h-10 text-sky-400 animate-spin mb-3" />
          <p className="text-white/70">AI sedang memproses data dari jawabanmu...</p>
          <p className="text-white/40 text-xs mt-2">Harap tunggu sebentar...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl space-y-6"
        >
          {/* Ringkasan AI */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-inner text-sm text-white/80">
            {aiData?.summary}
          </div>

          {/* Informasi Akademik */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg">
              <p className="text-sm text-white/70 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sky-400" /> Nama
              </p>
              <h2 className="text-3xl font-extrabold mt-3 text-sky-300">{name}</h2>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg">
              <p className="text-sm text-white/70 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-green-400" /> Jurusan
              </p>
              <h2 className="text-2xl font-bold mt-3 text-green-300">{major}</h2>
              <p className="text-xs text-white/50 mt-1">Semester {semester}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg">
              <p className="text-sm text-white/70 flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" /> Goal Utama
              </p>
              <h2 className="text-2xl font-bold mt-3 text-purple-300">
                {goals[0] || "Belum ditentukan"}
              </h2>
            </div>
          </div>

          {/* Profil Pembelajaran */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-inner">
              <h3 className="text-lg font-semibold mb-2 text-white/90">Profil Pembelajaran</h3>
              <p className="text-sm">
                <span className="text-white/50">Gaya Kerja:</span>{" "}
                <span className="font-semibold text-white">{aiData?.workStyle}</span>
              </p>
              <p className="text-sm">
                <span className="text-white/50">Gaya Belajar:</span>{" "}
                <span className="font-semibold text-white">{aiData?.learningStyle}</span>
              </p>
              <p className="text-sm">
                <span className="text-white/50">Bidang Unggulan:</span>{" "}
                <span className="font-semibold text-white">{aiData?.strength}</span>
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-inner">
              <h3 className="text-lg font-semibold mb-2 text-white/90">Performa Akademik</h3>
              <p className="text-white/60 text-sm">
                Berdasarkan hasil self-assessment, AI menilai kamu memiliki potensi tinggi di bidang{" "}
                <span className="text-white font-semibold">analisis dan kolaborasi tim</span>.
              </p>
            </div>
          </div>

          {/* Roadmap */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-white/90">Roadmap Akademik</h3>
            <div className="space-y-6 text-sm">
              <div>
                <p className="font-medium mb-2 text-white/80">📘 Semester Ini (4 Bulan)</p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  {aiData?.roadmap.shortTerm.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2 text-white/80">🎯 1 Tahun</p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  {aiData?.roadmap.longTerm.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-6 text-xs text-white/60">
            Analisis selesai — lanjutkan untuk melihat dashboard.
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}