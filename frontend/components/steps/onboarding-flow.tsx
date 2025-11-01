"use client"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import ProgressIndicator from "./progress-indicator"
import NameStep from "./name-step"
import MajorStep from "./major-step"
import SemesterStep from "./semester-step"
import AnalysisStep from "./analysis-step"
import SelfAssessmentStep from "./self-assessment-step"
import GoalsStep from "./goals-step"

export default function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [major, setMajor] = useState("")
  const [semester, setSemester] = useState("")
  const [assessment, setAssessment] = useState("")
  const [goals, setGoals] = useState([""])
  const [customRoadmap, setCustomRoadmap] = useState("")

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))
  const finish = () => router.push("/dashboard")

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <ProgressIndicator step={step} />

        <AnimatePresence mode="wait">
          {step === 1 && <NameStep name={name} setName={setName} />}
          {step === 2 && <MajorStep major={major} setMajor={setMajor} />}
          {step === 3 && <SemesterStep semester={semester} setSemester={setSemester} />}
          {step === 4 && <AnalysisStep name={name} major={major} semester={semester} />}
          {step === 5 && <SelfAssessmentStep assessment={assessment} setAssessment={setAssessment} />}
          {step === 6 && (
            <GoalsStep
              goals={goals}
              setGoals={setGoals}
              customRoadmap={customRoadmap}
              setCustomRoadmap={setCustomRoadmap}
            />
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button onClick={prevStep} className="flex items-center gap-2 text-white/80 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
          )}
          {step < 6 ? (
            <button
              onClick={nextStep}
              disabled={(step === 1 && !name) || (step === 2 && !major) || (step === 3 && !semester)}
              className="flex items-center gap-2 rounded-full px-6 py-2 font-semibold bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-md disabled:opacity-40 transition ml-auto"
            >
              Lanjutkan <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={finish}
              className="flex items-center gap-2 rounded-full px-6 py-2 font-semibold bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-md transition ml-auto"
            >
              Selesai <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
