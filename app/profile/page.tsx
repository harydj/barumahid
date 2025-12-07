import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { ProfileHero } from "@/components/ProfileHero"
import { ProfileAbout } from "@/components/ProfileAbout"
import { ProfileTeam } from "@/components/ProfileTeam"
import { ProfileAchievements } from "@/components/ProfileAchievements"

export default function ProfilePage() {
  return (
    <>
      <PortfolioNavbar />
      <ProfileHero />
      <ProfileAbout />
      <ProfileAchievements />
      <ProfileTeam />
      <Footer />
    </>
  )
}
