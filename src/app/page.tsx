"use client";

import { useState } from "react";

interface Expedition {
  id: string;
  name: string;
  location: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Extreme";
  difficultyColor: string;
  reward: string;
  description: string;
  gameType: string;
  details: {
    status: string;
    coordinates: string;
    anomalySpeed: string;
    hazardLevel: string;
    bestPilot: string;
    highScore: string;
  };
}

const EXPEDITIONS: Expedition[] = [
  {
    id: "neo-tokyo",
    name: "Neo-Tokyo Cyber Grid",
    location: "Quadrant 7-X",
    difficulty: "Medium",
    difficultyColor: "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10",
    reward: "1,200 Credits",
    description: "Infiltrate the neon grid systems of Neo-Tokyo. Evade terminal firewalls and gather rogue data clusters before security locks down.",
    gameType: "Grid Racer / Cyber-Hacker",
    details: {
      status: "STABLE",
      coordinates: "45.02 / -112.98 / +4.8",
      anomalySpeed: "1,450 km/s",
      hazardLevel: "42%",
      bestPilot: "0xGamerX",
      highScore: "998,200",
    },
  },
  {
    id: "hyperspace",
    name: "Hyperspace Outlaws",
    location: "Andromeda Outer Rim",
    difficulty: "Hard",
    difficultyColor: "text-accent-violet border-accent-violet/30 bg-accent-violet/10",
    reward: "1,850 Credits",
    description: "Pilot your fighter through a massive asteroid belt occupied by pirate outposts. Capture high-value bounty targets and escape in hyperdrive.",
    gameType: "3D Space Shooter",
    details: {
      status: "WARNING: PIRATE SIGNALS DETECTED",
      coordinates: "89.15 / +340.22 / -97.1",
      anomalySpeed: "3,800 km/s",
      hazardLevel: "79%",
      bestPilot: "StarHunter",
      highScore: "1,420,500",
    },
  },
  {
    id: "chrono-dungeon",
    name: "Chrono Dungeon",
    location: "Rift Valley 0-Alpha",
    difficulty: "Extreme",
    difficultyColor: "text-accent-magenta border-accent-magenta/30 bg-accent-magenta/10",
    reward: "3,200 Credits",
    description: "Navigate a morphing grid structure trapped outside of standard spacetime. Gather Chrono Shards to stabilize your energy signature.",
    gameType: "Retro Dungeon Crawler",
    details: {
      status: "DANGEROUS TEMP TEMPORAL RIFT",
      coordinates: "00.00 / 00.00 / 00.00",
      anomalySpeed: "Unknown",
      hazardLevel: "99%",
      bestPilot: "Chronos_Dev",
      highScore: "2,350,000",
    },
  },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<string>("neo-tokyo");
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [launchProgress, setLaunchProgress] = useState<number>(0);
  const [launchMessage, setLaunchMessage] = useState<string>("");

  const activeExpedition = EXPEDITIONS.find((e) => e.id === selectedId) || EXPEDITIONS[0];

  const handleLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    setLaunchProgress(0);
    setLaunchMessage("Establishing quantum connection...");

    const intervals = [
      { t: 800, msg: "Aligning space-time vector lattices..." },
      { t: 1600, msg: "Charging warp capacitors (80%)..." },
      { t: 2400, msg: "Clearing firewall defense arrays..." },
      { t: 3200, msg: "ENGAGED. Entering portal!" },
    ];

    intervals.forEach((step) => {
      setTimeout(() => {
        setLaunchMessage(step.msg);
      }, step.t);
    });

    const progressInterval = setInterval(() => {
      setLaunchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsLaunching(false);
            setLaunchProgress(0);
            alert(`⚡ Expedition coordinates lock-on successful. Welcome to ${activeExpedition.name}!`);
          }, 600);
          return 100;
        }
        return prev + 5;
      });
    }, 180);
  };

  return (
    <div className="flex-1 w-full relative grid-animation min-h-screen pb-16 flex flex-col justify-start">
      {/* Plain Header Section */}
      <header className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex items-center justify-between border-b border-white/5 relative z-10">
        <span className="font-orbitron tracking-widest text-lg font-bold text-white uppercase neon-glow-cyan">
          Arcade <span className="text-accent-magenta neon-glow-magenta">Expeditions</span>
        </span>
        <div className="text-xs text-gray-500 font-mono">SYSTEM READY</div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 flex-1">
        {/* Left Column: Mission Select */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <h1 className="font-orbitron text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
              SELECT YOUR <br />
              <span className="bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-magenta bg-clip-text text-transparent">
                DESTINATION GRID
              </span>
            </h1>
            <p className="text-gray-400 mt-3 text-sm md:text-base max-w-xl">
              Sync your console unit to one of the active temporal anomalies below. Warning: gravity wells and hostile entities differ by sector.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {EXPEDITIONS.map((exp) => {
              const isActive = exp.id === selectedId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedId(exp.id)}
                  className={`w-full text-left p-5 rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group ${
                    isActive
                      ? "glass-panel neon-border-cyan bg-white/[0.03]"
                      : "bg-white/[0.01] hover:bg-white/[0.03] border border-white/5"
                  }`}
                >
                  {/* Active highlight bar */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-cyan to-accent-magenta" />
                  )}

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest border ${exp.difficultyColor}`}>
                        {exp.difficulty}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">{exp.location}</span>
                    </div>
                    <h3 className={`font-orbitron text-lg font-bold transition-colors duration-200 ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                      {exp.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-1 max-w-md">
                      {exp.description}
                    </p>
                  </div>

                  <div className="flex md:flex-col items-start md:items-end justify-between md:justify-center border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                    <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">REWARD MULTIPLIER</span>
                    <span className="font-mono text-sm font-semibold text-accent-magenta neon-glow-magenta mt-0.5">
                      {exp.reward}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Stats Panel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Quantum Sync</span>
              <span className="text-white font-mono text-lg font-bold mt-1">99.98%</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Hull Integrity</span>
              <span className="text-accent-cyan font-mono text-lg font-bold mt-1">100%</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Reactors Charged</span>
              <span className="text-accent-magenta font-mono text-lg font-bold mt-1">MAX</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Warp Sockets</span>
              <span className="text-accent-violet font-mono text-lg font-bold mt-1">3 / 3</span>
            </div>
          </div>
        </section>

        {/* Right Column: Active Terminal details */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden flex-1 flex flex-col justify-between neon-border-violet">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-violet/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                  <span className="font-orbitron font-bold text-sm tracking-wider uppercase text-white">Console Monitor</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-accent-violet/20 border border-accent-violet/40 text-accent-violet text-[10px] font-mono">
                  ANOMALY ACTIVE
                </div>
              </div>

              {/* Holographic Header */}
              <div>
                <span className="text-xs text-gray-400 font-mono block">PILOTING EXPEDITION TO</span>
                <h2 className="font-orbitron text-2xl font-black text-white mt-1 uppercase tracking-tight">
                  {activeExpedition.name}
                </h2>
                <div className="mt-2 text-xs text-accent-cyan font-mono flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                  </svg>
                  {activeExpedition.location}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 leading-relaxed bg-white/[0.02] p-4 rounded-lg border border-white/5 font-light">
                {activeExpedition.description}
              </p>

              {/* Detailed metrics list */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
                <div>
                  <span className="text-gray-500 block uppercase font-mono tracking-wider">GAME MECHANICS</span>
                  <span className="text-white font-medium block mt-1">{activeExpedition.gameType}</span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase font-mono tracking-wider">COORDINATES</span>
                  <span className="text-white font-mono block mt-1">{activeExpedition.details.coordinates}</span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase font-mono tracking-wider">ANOMALY DRIFT</span>
                  <span className="text-white font-mono block mt-1">{activeExpedition.details.anomalySpeed}</span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase font-mono tracking-wider">HAZARD COEFFICIENT</span>
                  <span className="text-accent-magenta font-mono block mt-1 font-semibold">{activeExpedition.details.hazardLevel}</span>
                </div>
              </div>

              {/* Leaderboards */}
              <div className="bg-black/40 border border-white/5 p-4 rounded-lg">
                <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest font-mono pb-2 border-b border-white/5 mb-3">
                  <span>Sector Record Holder</span>
                  <span>Grid High Score</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">👑</span>
                    <span className="text-white font-semibold text-sm">{activeExpedition.details.bestPilot}</span>
                  </div>
                  <span className="text-accent-cyan font-mono text-sm font-bold shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                    {activeExpedition.details.highScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Launch controls at bottom */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
              {isLaunching ? (
                <div className="w-full flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-accent-cyan animate-pulse">{launchMessage}</span>
                    <span className="text-white font-bold">{launchProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-magenta transition-all duration-150 ease-out"
                      style={{ width: `${launchProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLaunch}
                  className="w-full py-4 px-6 rounded-xl font-orbitron font-extrabold uppercase text-sm tracking-widest bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 hover:from-cyan-400 hover:via-indigo-400 hover:to-pink-400 text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
                >
                  Launch Quantum Portal
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Retro bottom grid scanner effect */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-magenta opacity-80 z-50"></div>
    </div>
  );
}
