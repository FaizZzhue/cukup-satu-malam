"use client"

import OnboardingFlow from "@/components/onboarding/steps/onboarding-flow"
import { OnboardingProvider } from "@/app/context/onboarding-context"

export default function OnboardingPage() {
    return (
        <OnboardingProvider>
            <OnboardingFlow />
        </OnboardingProvider>
    )
}