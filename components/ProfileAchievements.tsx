"use client"
import { motion } from "framer-motion"
import { Building2, Users, Clock, Award } from "lucide-react"

const achievements = [
  {
    icon: Building2,
    number: "500+",
    label: "Proyek Selesai",
    color: "text-primary",
  },
  {
    icon: Users,
    number: "50+",
    label: "Tim Profesional",
    color: "text-primary",
  },
  {
    icon: Clock,
    number: "15+",
    label: "Tahun Pengalaman",
    color: "text-primary",
  },
  {
    icon: Award,
    number: "98%",
    label: "Kepuasan Klien",
    color: "text-primary",
  },
]

export const ProfileAchievements = () => {
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
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <Icon className={`w-12 h-12 ${achievement.color} mx-auto mb-4`} />
                <h3 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: "Figtree" }}>
                  {achievement.number}
                </h3>
                <p className="text-foreground/70 font-medium" style={{ fontFamily: "Figtree" }}>
                  {achievement.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
