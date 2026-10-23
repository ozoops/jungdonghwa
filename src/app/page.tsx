import { PhoneFrame } from "@/components/common/PhoneFrame";
import { StickyContactBar } from "@/components/common/StickyContactBar";
import { ConcernCards } from "@/components/sections/ConcernCards";
import { FaqList } from "@/components/sections/FaqList";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Profile } from "@/components/sections/Profile";
import { PromiseList } from "@/components/sections/PromiseList";
import { ShortcutCard } from "@/components/sections/ShortcutCard";
import { StartConsult } from "@/components/sections/StartConsult";
import { StepsCarousel } from "@/components/sections/StepsCarousel";
import { StepsList } from "@/components/sections/StepsList";
import { TopNotice } from "@/components/sections/TopNotice";
import { site } from "@/config/site";

export default function Home() {
  return (
    <PhoneFrame bar={<StickyContactBar />}>
      <TopNotice />
      <main className="bg-canvas">
        <Hero />
        <ShortcutCard />
        <PromiseList />
        <ConcernCards />
        {site.steps.layout === "carousel" ? <StepsCarousel /> : <StepsList />}
        <Profile />
        <FaqList />
        <StartConsult />
      </main>
      <Footer />
    </PhoneFrame>
  );
}
