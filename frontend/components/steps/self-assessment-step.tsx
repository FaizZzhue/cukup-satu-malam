"use client"

import { useState } from "react"
import { useOnboarding } from "@/app/context/onboarding-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SelfAssessmentStepProps {
  onNext: () => void
}

const QUESTIONS = [
  "Saya percaya diri dalam kemampuan akademik saya.",
  "Saya mampu mengatur waktu belajar dengan baik.",
  "Saya sering bekerja sama dalam tim.",
  "Saya mampu menyelesaikan tugas sebelum deadline.",
  "Saya aktif mencari peluang pengembangan diri.",
  "Saya memahami arah karier saya setelah lulus.",
  "Saya mampu mengelola stres akademik.",
  "Saya terbuka terhadap feedback dari dosen atau teman.",
  "Saya merasa pembelajaran saya efektif.",
  "Saya memiliki tujuan jangka panjang yang jelas.",
]

const choices = ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"]

export default function SelfAssessmentStep({ onNext }: SelfAssessmentStepProps) {
  const { updateUserProfile } = useOnboarding()
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleNext = () => {
    const workStyle = answers[1] || "Fleksibel"
    const learningStyle = answers[2] || "Campuran"
    updateUserProfile({ workStyle, learningStyle })
    onNext()
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">Self-Assessment</h2>
      <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-2">
        {QUESTIONS.map((q, i) => (
          <div key={i} className="border-b border-white/10 pb-2">
            <p className="mb-2 text-sm">
              {i + 1}. {q}
            </p>
            <div className="flex flex-wrap gap-2">
              {choices.map((c) => (
                <button
                  key={c}
                  onClick={() => setAnswers({ ...answers, [i]: c })}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    answers[i] === c
                      ? "bg-blue-500 border-blue-400"
                      : "bg-white/10 border-white/20 hover:bg-white/20"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}