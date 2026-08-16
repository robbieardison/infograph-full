"use client";

import { useState } from "react";
import { AnalystAgentPanel } from "@/components/agent/AnalystAgentPanel";
import { CtaSection } from "@/components/studio/CtaSection";
import { OfferSection } from "@/components/studio/OfferSection";
import { ProcessSection } from "@/components/studio/ProcessSection";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioHero } from "@/components/studio/StudioHero";
import { WorkSection } from "@/components/studio/WorkSection";
import type { ChartSnapshot } from "@/lib/agent-scripts";

export function StudioLanding() {
  const [snapshot, setSnapshot] = useState<ChartSnapshot | null>(null);

  return (
    <>
      <StudioHeader />
      <main>
        <StudioHero onSnapshot={setSnapshot} />
        <OfferSection />
        <WorkSection />
        <ProcessSection />
        <AnalystAgentPanel snapshot={snapshot} />
        <CtaSection />
      </main>
      <StudioFooter />
    </>
  );
}
