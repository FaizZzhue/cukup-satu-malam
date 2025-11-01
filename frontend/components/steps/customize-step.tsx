"use client"

import { motion } from "framer-motion"
import { useOnboarding } from "@/app/context/onboarding-context"
import { Plus, Trash2 } from "lucide-react"

export default function CustomizeStep() {
  const { activities, setActivities } = useOnboarding()

  const handleAddActivity = () => {
    setActivities([...activities, ""])
  }

  const handleRemoveActivity = (index: number) => {
    if (activities.length > 1) {
      setActivities(activities.filter((_, i) => i !== index))
    }
  }

  const handleActivityChange = (index: number, value: string) => {
    const newActivities = [...activities]
    newActivities[index] = value
    setActivities(newActivities)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2 gradient-text">Customize Your Roadmap</h2>
        <p className="text-white/60">Add activities and tasks to your personalized roadmap</p>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            className="glass-card p-4 flex gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <input
              type="text"
              value={activity}
              onChange={(e) => handleActivityChange(index, e.target.value)}
              placeholder={`Activity ${index + 1}`}
              className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none"
            />
            {activities.length > 1 && (
              <button
                onClick={() => handleRemoveActivity(index)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <button
        onClick={handleAddActivity}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-lg transition-colors font-medium"
      >
        <Plus className="w-5 h-5" />
        Add Another Activity
      </button>
    </motion.div>
  )
}
