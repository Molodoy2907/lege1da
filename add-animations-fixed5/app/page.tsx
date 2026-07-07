import { StudioPreloader } from "@/components/studio/studio-preloader"
import { StudioHeader } from "@/components/studio/studio-header"
import { StudioHero } from "@/components/studio/studio-hero"
import { StudioDemos } from "@/components/studio/studio-demos"
import { StudioServices } from "@/components/studio/studio-services"
import { StudioPricing } from "@/components/studio/studio-pricing"
import { StudioProcess } from "@/components/studio/studio-process"
import { StudioFaq } from "@/components/studio/studio-faq"
import { StudioFooter } from "@/components/studio/studio-footer"
import { StudioContact } from "@/components/studio/studio-contact"

export default function HomePage() {
  return (
    <div className="studio min-h-svh">
      <StudioPreloader />
      <StudioHeader />
      <main>
        <StudioHero />
        <StudioDemos />
        <StudioServices />
        <StudioPricing />
        <StudioProcess />
        <StudioFaq />
      </main>
      <StudioFooter />
      <StudioContact />
    </div>
  )
}
