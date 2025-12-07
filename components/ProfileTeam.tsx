"use client"
import { motion } from "framer-motion"

const teamMembers = [
  {
    name: "Bambang Sutrisno",
    role: "Founder & CEO",
    expertise: "Arsitek Kepala",
    image: "👨‍💼",
  },
  {
    name: "Siti Nurhaliza",
    role: "Head of Design",
    expertise: "Structural Engineer",
    image: "👩‍💼",
  },
  {
    name: "Ahmad Wijaya",
    role: "Technical Director",
    expertise: "BIM Expert",
    image: "👨‍💼",
  },
  {
    name: "Rina Kartika",
    role: "Project Manager",
    expertise: "Konstruksi Sipil",
    image: "👩‍💼",
  },
]

export const ProfileTeam = () => {
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
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 text-center text-6xl">
                {member.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "Figtree" }}>
                  {member.name}
                </h3>
                <p className="text-primary font-semibold mb-2" style={{ fontFamily: "Figtree" }}>
                  {member.role}
                </p>
                <p className="text-sm text-foreground/70" style={{ fontFamily: "Figtree" }}>
                  {member.expertise}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
