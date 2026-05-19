import { DemoOne } from "@/components/ui/etheral-shadow-demo";
import { LimelightNav } from "@/components/ui/limelight-nav";
import { AboutSection } from "@/components/ui/about-section";
import { ServicesSection } from "@/components/ui/services-section";
import { ProcessSection } from "@/components/ui/process-section";
import { MinimalFooter } from "@/components/ui/minimal-footer";
import { AvatarHoverCard } from "@/components/ui/avatar-hover-card";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black">
      <div className="absolute inset-x-0 top-10 z-40 flex justify-center">
        <LimelightNav />
      </div>

      <div className="absolute top-8 right-20 z-50 hidden sm:block">
        <AvatarHoverCard
          name="Максим"
          username="@mftmanager"
          description="Проконсультирую по вашему проекту и помогу выбрать оптимальное решение."
        />
      </div>

      {/* Hero */}
      <section id="hero" className="w-full min-h-screen">
        <DemoOne />
      </section>

      {/* Почему мы + статистика */}
      <AboutSection />

      {/* Услуги */}
      <ServicesSection />

      {/* Как мы работаем */}
      <ProcessSection />

      <MinimalFooter />
    </main>
  );
}
