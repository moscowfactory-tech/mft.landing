import { LimelightNav } from "@/components/ui/limelight-nav";
import { CasesSection } from "@/components/ui/cases-section";
import { MinimalFooter } from "@/components/ui/minimal-footer";

export default function CasesPage() {
  return (
    <main className="relative w-full min-h-screen bg-black">
      <div className="absolute inset-x-0 top-10 z-40 flex justify-center">
        <LimelightNav />
      </div>

      <div className="pt-32">
        <CasesSection />
      </div>

      <MinimalFooter />
    </main>
  );
}
