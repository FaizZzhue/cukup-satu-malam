"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type OnboardingStep = "major" | "semester" | "import" | "completed"
export type ProfilingStep = "analysis" | "self-assessment" | "visualization" | "completed"
export type GoalsStep = "main-goal" | "roadmap" | "customize" | "completed"

export interface UserProfile {
  email: string
  major: string
  semester: number
  grades?: Record<string, number>
  courses?: string[]
  strengths?: string[]
  weaknesses?: string[]
  workStyle?: string
  learningStyle?: string
  mainGoal?: string
  subGoals?: string[]
  roadmap?: RoadmapItem[]
}

export interface RoadmapItem {
  phase: string
  activities: string[]
  timeline: string
}

interface OnboardingContextType {
  currentStage: "onboarding" | "profiling" | "goals" | "dashboard"
  onboardingStep: OnboardingStep
  profilingStep: ProfilingStep
  goalsStep: GoalsStep
  userProfile: UserProfile
  setOnboardingStep: (step: OnboardingStep) => void
  setProfilingStep: (step: ProfilingStep) => void
  setGoalsStep: (step: GoalsStep) => void
  setCurrentStage: (stage: "onboarding" | "profiling" | "goals" | "dashboard") => void
  updateUserProfile: (updates: Partial<UserProfile>) => void
  getProgress: () => number
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStage, setCurrentStage] = useState<"onboarding" | "profiling" | "goals" | "dashboard">("onboarding")
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("major")
  const [profilingStep, setProfilingStep] = useState<ProfilingStep>("analysis")
  const [goalsStep, setGoalsStep] = useState<GoalsStep>("main-goal")
  const [userProfile, setUserProfile] = useState<UserProfile>({
    email: "",
    major: "",
    semester: 1,
  })

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }))
  }

  const getProgress = () => {
    const stages = ["onboarding", "profiling", "goals", "dashboard"]
    const stageIndex = stages.indexOf(currentStage)
    return ((stageIndex + 1) / stages.length) * 100
  }

  return (
    <OnboardingContext.Provider
      value={{
        currentStage,
        onboardingStep,
        profilingStep,
        goalsStep,
        userProfile,
        setOnboardingStep,
        setProfilingStep,
        setGoalsStep,
        setCurrentStage,
        updateUserProfile,
        getProgress,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider")
  }
  return context
}
