"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Building2, Users, Clock, Award } from "lucide-react"

type Achievement = {
  id: string
  icon?: string | null
  number: string
  label: string
  order: number
}

const iconMap: Record<string, any> = {
  'Building2': Building2,
  'Users': Users,
  'Clock': Clock,
  'Award': Award,
}

export const ProfileAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await fetch('/api/profile/achievements')
        const data = await res.json()
        if (Array.isArray(data)) {
          setAchievements(data)
        }
      } catch (error) {
        console.error('Error fetching achievements:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAchievements()
  }, [])
  return (
    <section className="w-full py-20 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16"
          style={{ fontFamily: "Figtree" }}
        >
          Pencapaian Kami
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            <div className="col-span-4 text-center text-gray-500 py-8">Loading achievements...</div>
          ) : achievements.length > 0 ? (
            achievements.map((achievement, index) => {
              const Icon = achievement.icon ? iconMap[achievement.icon] || Award : Award
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: "Figtree" }}>
                    {achievement.number}
                  </h3>
                  <p className="text-foreground/70 font-medium" style={{ fontFamily: "Figtree" }}>
                    {achievement.label}
                  </p>
                </motion.div>
              )
            })
          ) : (
            <div className="col-span-4 text-center text-gray-500 py-8">No achievements available</div>
          )}
        </div>
      </div>
    </section>
  )
}
