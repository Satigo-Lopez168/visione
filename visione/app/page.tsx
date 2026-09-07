import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { AboutSection } from "@/components/home/AboutSection"
import { AccreditationStrip } from "@/components/home/AccreditationStrip"
import { AdmissionsSection } from "@/components/home/AdmissionsSection"
import { FaqSection } from "@/components/home/FaqSection"
import { FinalCtaSection } from "@/components/home/FinalCtaSection"
import { HeroSection } from "@/components/home/HeroSection"
import { ModelSection } from "@/components/home/ModelSection"
import { ProgramsSection } from "@/components/home/ProgramsSection"

/**
 * Portada del sitio, traducida del prototipo `Visione Sitio Web.dc.html`. La
 * página se queda como componente de servidor: la interactividad vive en
 * `SiteHeader`, `HeroSection` y `AboutSection`, que son los únicos islotes de
 * cliente.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1 overflow-x-clip">
        <HeroSection />
        <AccreditationStrip />
        <AboutSection />
        <ProgramsSection />
        <ModelSection />
        <AdmissionsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <SiteFooter />
    </>
  )
}
