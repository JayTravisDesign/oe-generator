import { LandingContent } from "@/components/ui/landing-content";
import { LandingHero } from "@/components/ui/landing-hero";
import { LandingNavbar } from "@/components/ui/landing-navbar"

const LandingPage = () => {
    return (
        <div className="h-full">
            <LandingNavbar />
            <LandingHero />
            <LandingContent />
        </div>
    )
}

export default LandingPage;