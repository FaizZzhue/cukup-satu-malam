"use client"

import { useOnboarding } from "@/app/context/onboarding-context"
import { CheckCircle2 } from "lucide-react"

export function ProgressStepper() {
  const { currentStage, getProgress } = useOnboarding()

  const stages = [
    { id: "onboarding", label: "OnBoarding", description: "Identitas & Data" },
    { id: "profiling", label: "Profiling", description: "Analisis Potensi" },
    { id: "goals", label: "Set Goals", description: "Tujuan & Roadmap" },
    { id: "dashboard", label: "Dashboard", description: "Ringkasan" },
  ]

  const currentIndex = stages.findIndex((s) => s.id === currentStage)

  return (
    <div className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between mb-4">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    index <= currentIndex
                      ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg shadow-blue-500/50"
                      : "bg-white/10 text-white/50 border border-white/20"
                  }`}
                >
                  {index < currentIndex ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className="text-xs md:text-sm font-semibold text-white">{stage.label}</p>
                  <p className="text-xs text-white/60">{stage.description}</p>
                </div>
              </div>
              {index < stages.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all ${
                    index < currentIndex ? "bg-gradient-to-r from-indigo-500 to-blue-500" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="w-full bg-white/10 rounded-full h-1">
          <div
            className="bg-gradient-to-r from-indigo-500 to-blue-500 h-1 rounded-full transition-all duration-500 shadow-lg shadow-blue-500/50"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>
    </div>
  )
}
