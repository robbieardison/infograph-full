"use client";

import type { Concept } from "@/lib/concepts";
import { BriefingDemo } from "./briefing/BriefingDemo";
import { FunnelDemo } from "./funnel/FunnelDemo";
import { NorthstarDemo } from "./northstar/NorthstarDemo";
import { SignalroomDemo } from "./signalroom/SignalroomDemo";
import { BranchShellDemo } from "./shells/BranchShellDemo";

export function ConceptDemo({ concept }: { concept: Concept }) {
  switch (concept.slug) {
    case "northstar":
      return <NorthstarDemo concept={concept} />;
    case "signalroom":
      return <SignalroomDemo concept={concept} />;
    case "funnel":
      return <FunnelDemo concept={concept} />;
    case "briefing":
      return <BriefingDemo concept={concept} />;
    default:
      return <BranchShellDemo concept={concept} />;
  }
}
