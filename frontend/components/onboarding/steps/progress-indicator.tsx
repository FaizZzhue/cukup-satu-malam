"use client"
export default function ProgressIndicator({ step }: { step: number }) {
  return (
    <div className="flex justify-center mb-6 space-x-2">
      {[1, 2, 3, 4, 5, 6].map((s) => (
        <div key={s} className={`w-3 h-3 rounded-full transition-all ${s <= step ? "bg-blue-500" : "bg-white/30"}`} />
      ))}
    </div>
  )
}
