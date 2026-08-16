"use client";

import { useEffect, useState } from "react";
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
      text: "I’m a **demo** analyst. Pick a prompt — answers are scripted samples, not a live model.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const snap = snapshot?.topLabel ? snapshot : SAMPLE;

  useEffect(() => {
    // keep panel in sync when infograph updates — no auto-message
  }, [snapshot]);

  const ask = (intent: AgentIntent, label: string) => {
    if (typing) return;
    setMessages((m) => [...m, { role: "user", text: label }]);
    setTyping(true);
    window.setTimeout(() => {
      const reply = getAgentReply(intent, snap);
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      setTyping(false);
    }, 650);
  };

  return (
    <section id="agent" className="border-t border-line bg-card px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-petrol">
            AI analyst
          </p>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            Ask about the chart
          </h2>
          <p className="mt-3 text-muted">
            Scripted demo tied to your Infograph snapshot (or a sample). Production agents can plug
            into your warehouse and real models.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 border border-petrol/30 bg-petrol-soft/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-petrol-deep">
            Demo · sample answers
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <div className="border border-line bg-paper p-3">
              <dt className="text-xs uppercase tracking-wider text-muted">Chart</dt>
              <dd className="mt-1 font-semibold text-ink">{snap.title}</dd>
            </div>
            <div className="border border-line bg-paper p-3">
              <dt className="text-xs uppercase tracking-wider text-muted">Top</dt>
              <dd className="mt-1 font-semibold text-ink">
                {snap.topLabel} · {snap.topValue}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex min-h-[380px] flex-col border border-line bg-paper">
          <div className="flex flex-wrap gap-2 border-b border-line p-3">
            {AGENT_PROMPTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => ask(p.id, p.label)}
                className="rounded-sm border border-line bg-card px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-petrol hover:text-petrol"
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[92%] rounded-sm px-3 py-2 ${
                  m.role === "user"
                    ? "ml-auto bg-petrol text-white"
                    : "bg-cream/80 text-ink"
                }`}
              >
                <MessageBody text={m.text} />
              </div>
            ))}
            {typing && (
              <p className="text-xs font-medium text-muted" aria-live="polite">
                Analyst is typing…
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
