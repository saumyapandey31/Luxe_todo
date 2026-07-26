import { useState, useEffect, useRef, useCallback } from "react";

const MODES = {
  focus: { label: "Focus", duration: 25 * 60, color: "#5B2D1D" },
  short: { label: "Short Break", duration: 5 * 60, color: "#3B7D5D" },
  long: { label: "Long Break", duration: 15 * 60, color: "#C8A165" },
};

export default function PomodoroPage() {
  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(MODES.focus.duration);
  const [running, setRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef(null);

  const total = MODES[mode].duration;
  const progress = 1 - secondsLeft / total;

  const switchMode = useCallback((m) => {
    setMode(m);
    setSecondsLeft(MODES[m].duration);
    setRunning(false);
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (mode === "focus") setSessionsCompleted((c) => c + 1);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");
  const circumference = 2 * Math.PI * 120;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-center gap-1 luxe-card p-1 w-fit mx-auto">
        {Object.entries(MODES).map(([key, m]) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            className={`px-4 py-2 rounded-2xl text-sm transition-all ${mode === key ? "bg-brown-dark text-cream" : "text-ink/60 hover:text-brown-dark"}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="luxe-card p-10 sm:p-16 flex flex-col items-center">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-8">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 260 260">
            <circle cx="130" cy="130" r="120" fill="none" stroke="rgba(91,45,29,0.08)" strokeWidth="10" />
            <circle
              cx="130" cy="130" r="120" fill="none"
              stroke={MODES[mode].color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="text-center">
            <p className="font-display text-6xl text-brown-dark tabular-nums">{mins}:{secs}</p>
            <p className="text-sm text-ink/45 mt-2">{MODES[mode].label}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setRunning(!running)}
            className="luxe-btn-primary px-10 py-4 text-sm"
          >
            {running ? "Pause" : secondsLeft === total ? "Start" : "Resume"}
          </button>
          <button
            onClick={() => { setSecondsLeft(total); setRunning(false); }}
            className="luxe-btn-ghost px-6 py-4 text-sm"
          >
            Reset
          </button>
        </div>

        <div className="mt-10 w-full luxe-divider" />
        <div className="mt-8 flex items-center gap-10 text-center">
          <div>
            <p className="font-display text-3xl text-brown-dark">{sessionsCompleted}</p>
            <p className="text-xs text-ink/45 mt-1">Sessions today</p>
          </div>
          <div>
            <p className="font-display text-3xl text-brown-dark">{sessionsCompleted * 25}</p>
            <p className="text-xs text-ink/45 mt-1">Focus minutes</p>
          </div>
        </div>
      </div>

      <div className="luxe-card p-6 flex items-center gap-4">
        <span className="w-11 h-11 rounded-full bg-cream flex items-center justify-center text-lg">♪</span>
        <div>
          <p className="text-sm font-medium text-brown-dark">Focus music</p>
          <p className="text-xs text-ink/45">Ambient soundscapes — coming soon</p>
        </div>
      </div>
    </div>
  );
}
