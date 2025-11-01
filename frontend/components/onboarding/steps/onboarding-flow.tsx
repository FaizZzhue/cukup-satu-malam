"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { auth } from "../../../firebase"

import ProgressIndicator from "./progress-indicator"
import NameStep from "./name-step"
import MajorStep from "./major-step"
import SemesterStep from "./semester-step"
import SelfAssessmentStep from "./self-assessment-step"
import GoalsStep from "./goals-step"
import AnalysisStep from "./analysis-step"

export default function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [major, setMajor] = useState("")
  const [semester, setSemester] = useState("")
  const [assessment, setAssessment] = useState<Record<number, string>>({})
  const [goals, setGoals] = useState([""])
  const [customRoadmap, setCustomRoadmap] = useState("")

  const nextStep = async () => {
    const idToken = await auth.currentUser?.getIdToken();

    const response = await fetch(`http://localhost:3001/api/users/${auth.currentUser?.uid}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (response.ok) {
      var tempStep = 1;
      const userData = await response.json();
      if (userData.name) {
        tempStep += 1;
      }
      if (userData.program_studi) {
        tempStep += 1;
      }
      if (userData.semester) {
        tempStep += 2;
      }
      setStep(tempStep);
    }

    if (step === 3) {
      console.log("Submitting user data");
      try {
        const response = await fetch(`http://localhost:3001/api/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            nama_lengkap: name,
            program_studi: major,
            semester
          }),
        });
      } catch (error) {
        console.error("Error submitting user data:", error);
      }
    }
    else if (step === 4) {
      const response = await fetch (`http://localhost:3001/api/gemini/analyze-mini-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          quizResponse: assessment
        }),
      })
    }
    else if (step === 5) {
      console.log(goals);
      const response = await fetch(`http://localhost:3001/api/users/${auth.currentUser?.uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          tujuan_karir: goals[0],
          opsional_karir: goals.slice(1),
        }),
      });

      if (response.ok) {
        const data = await response.json();
      }
    }
    setStep((prev) => Math.min(prev + 1, 6))
  }
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))
  const finish = async () => {
    const idToken = await auth.currentUser?.getIdToken();

    const response = await fetch(`http://localhost:3001/api/users/${auth.currentUser?.uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          nama_lengkap: name,
          program_studi: major,
          semester,
          tujuan_karir: goals[0],
          opsional_karir: goals.slice(1),
        }),
      })
    router.push("/dashboard")
  }

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen flex items-center justify-center px-4 text-white"
    >
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <ProgressIndicator step={step} />

        <AnimatePresence mode="wait">
          {step === 1 && <NameStep name={name} setName={setName} />}
          {step === 2 && <MajorStep major={major} setMajor={setMajor} />}
          {step === 3 && <SemesterStep semester={semester} setSemester={setSemester} />}
          {step === 4 && (
            <SelfAssessmentStep
              assessment={assessment}
              setAssessment={setAssessment}
            />
          )}
          {step === 5 && (
            <GoalsStep
              goals={goals}
              setGoals={setGoals}
              customRoadmap={customRoadmap}
              setCustomRoadmap={setCustomRoadmap}
              assessment={assessment}
              onBack={prevStep}
              onNext={() => setStep(6)}
            />
          )}
          {step === 6 && (
            <AnalysisStep
              name={name}
              major={major}
              semester={semester}
              goals={goals}
              assessment={assessment}
              onBack={prevStep}
              onNext={finish}
            />
          )}
        </AnimatePresence>

        {/* Navigation Global (sembunyikan di GoalsStep) */}
        {step !== 5 && (
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 text-white/80 hover:text-white transition"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
            )}

            {step < 6 ? (
              <button
                onClick={nextStep}
                disabled={
                  (step === 1 && !name) ||
                  (step === 2 && !major) ||
                  (step === 3 && !semester)
                }
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
        )}
      </div>
    </div>
  )
}
