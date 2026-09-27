"use client";

import { useState } from "react";
import Terminal from "./Terminal";
import Sniper from "./Sniper";
import ThemeToggle from "./ThemeToggle";
import Endgame from "./Endgame";
import KellyDesk from "./KellyDesk";
import CriticDesk from "./CriticDesk";

export type Tab = "endgame" | "pair" | "sniper" | "kelly" | "critic";

const TABS: { id: Tab; label: string; short: string }[] = [
  { id: "endgame", label: "ENDGAME", short: "END" },
  { id: "pair", label: "PAIR TAPE", short: "PAIR" },
  { id: "sniper", label: "SNIPER", short: "SNP" },
  { id: "kelly", label: "KELLY", short: "KEL" },
  { id: "critic", label: "CRITIC", short: "CRT" },
];

export default function AppShell() {
  const [tab, setTab] = useState<Tab>("endgame");

  return (
    <div className="shell mobile-shell">
      <div className="grid-bg" />
      <header className="topbar mobile-top">
        <div className="brand">
          <span className="mark" />
          <div>
            <div className="logo">PAIRLOCK</div>
            <div className="tag">Paper desk · no live fire</div>
          </div>
        </div>
        <div className="top-actions">
          <span className="pulse on hide-sm">PAPER</span>
          <ThemeToggle />
        </div>
      </header>
      <nav className="desk-tabs hide-sm-down" aria-label="Desk sections">
        {TABS.map((t) => (
          <button key={t.id} type="button" className={`hud-btn ${tab === t.id ? "primary" : ""}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>
      <main className="stage">
        {tab === "endgame" ? <Endgame /> : null}
        {tab === "pair" ? <Terminal embedded /> : null}
        {tab === "sniper" ? <Sniper /> : null}
        {tab === "kelly" ? <KellyDesk /> : null}
        {tab === "critic" ? <CriticDesk /> : null}
      </main>
      <footer className="foot desk-foot">PAIRLOCK · paper desk · no keys · built in Louisville, KY</footer>
      <nav className="dock" aria-label="Mobile desk">
        {TABS.map((t) => (
          <button key={t.id} type="button" className={`dock-btn ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
            <i className={`dock-dot ${t.id}`} />
            <span>{t.short}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
