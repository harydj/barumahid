"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type TeamMember = {
  id: string
  name: string
  role: string
  expertise?: string | null
  image?: string | null
  bio?: string | null
  linkedin?: string | null
  order: number
}

export const ProfileTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch('/api/profile/team')
        const data = await res.json()
        if (Array.isArray(data)) {
          setTeamMembers(data)
        }
      } catch (error) {
        console.error('Error fetching team members:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTeam()
  }, [])
  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "Figtree" }}>
            Tim Kami
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto" style={{ fontFamily: "Figtree" }}>
            Dipimpin oleh para profesional berpengalaman dengan keahlian di bidang arsitektur, teknik struktural, dan
            teknologi konstruksi digital
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-4 text-center text-gray-500 py-8">Loading team members...</div>
          ) : teamMembers.length > 0 ? (
            teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 text-center text-6xl">
                  {member.image || "👤"}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "Figtree" }}>
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-2" style={{ fontFamily: "Figtree" }}>
                    {member.role}
                  </p>
                  {member.expertise && (
                    <p className="text-sm text-foreground/70" style={{ fontFamily: "Figtree" }}>
                      {member.expertise}
                    </p>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500 py-8">No team members available</div>
          )}
        </div>
      </div>
    </section>
  )
}
