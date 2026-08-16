"use client";

import { useState } from "react";
import {
  AGENT_PROMPTS,
  getAgentReply,
  type AgentIntent,
  type ChartSnapshot,
} from "@/lib/agent-scripts";

type Msg = { role: "user" | "assistant"; text: string };

const SAMPLE: ChartSnapshot = {
  title: "Revenue by Region",
  subtitle: "Sample regional performance",
  chartType: "bar",
  topLabel: "North America",
  topValue: "3.9M",
  total: "8.7M",
  peak: "1.1M",
};

export function AnalystAgentPanel({ snapshot }: { snapshot?: ChartSnapshot | null }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Demo analyst only — answers are scripted. Pick a prompt keyed to your Infograph snapshot.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const snap = snapshot?.topLabel ? snapshot : SAMPLE;

  const ask = (intent: AgentIntent, label: string) => {
    if (typing) return;
    setMessages((m) => [...m, { role: "user", text: label }]);
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: getAgentReply(intent, snap) }]);
      setTyping(false);
    }, 650);
  };

  return (
    <section id="agent" className="border-b border-line bg-panel">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="font-mono text-[11px] text-petrol">04 · analyst</p>
          <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Talk to the chart
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Scripted co-pilot over your live Infograph snapshot. Production agents wire into your
            warehouse — this shows the experience.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-orange/40 bg-orange/10 px-3 py-1.5 font-mono text-[10px] text-orange">
            demo · sample answers
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-md border border-line bg-void p-3">
              <dt className="font-mono text-[9px] uppercase text-faint">Chart</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{snap.title}</dd>
            </div>
            <div className="rounded-md border border-line bg-void p-3">
              <dt className="font-mono text-[9px] uppercase text-faint">Leader</dt>
              <dd className="mt-1 text-sm font-semibold text-petrol">
                {snap.topLabel} · {snap.topValue}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex min-h-[360px] flex-col overflow-hidden rounded-lg border border-line bg-void">
          <div className="flex items-center gap-2 border-b border-line px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red" />
            <span className="h-2 w-2 rounded-full bg-orange" />
            <span className="h-2 w-2 rounded-full bg-petrol" />
            <span className="ml-2 font-mono text-[10px] text-faint">analyst.session</span>
          </div>
          <div className="flex flex-wrap gap-2 border-b border-line p-3">
            {AGENT_PROMPTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => ask(p.id, p.label)}
                className="rounded-md border border-line bg-raised px-2.5 py-1 text-xs text-muted transition hover:border-petrol hover:text-ink"
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[92%] rounded-md px-3 py-2 ${
                  m.role === "user"
                    ? "ml-auto bg-red text-white"
                    : "border border-line bg-panel text-ink"
                }`}
              >
                <MessageBody text={m.text} />
              </div>
            ))}
            {typing && (
              <p className="font-mono text-[11px] text-faint" aria-live="polite">
                typing…
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MessageBody({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\n)/g);
  return (
    <p className="whitespace-pre-wrap leading-relaxed">
      {parts.map((part, i) => {
        if (part === "\n") return <br key={i} />;
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}
