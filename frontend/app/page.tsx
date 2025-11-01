"use client"
import Navbar from "../components/navbar"
import HeroSection from "../components/hero-section"
import FeaturesSection from "../components/features-section"
import HowItWorks from "../components/how-it-works"
import CTASection from "../components/cta-section"
import Footer from "../components/footer"

export default function Home() {
  return (
    <main className="safe-x w-full flex justify-center">
      <div className="relative w-full max-w-6xl lg:max-w-7xl mx-4 sm:mx-6 md:mx-auto my-4 sm:my-6 md:my-10 px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 bg-white/10 backdrop-blur-2xl border border-white/15 rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <CTASection />
        <Footer />
      </div>
    </main>
  )
}