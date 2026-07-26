import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import * as authService from "../services/authService";
import { MOODS } from "../utils/constants";

const BADGES = [
  { id: "first-task", label: "First Step", body: "Complete your first task", emoji: "🌱", threshold: 1 },
  { id: "ten-tasks", label: "In the Groove", body: "Complete 10 tasks", emoji: "⚡", threshold: 10 },
  { id: "fifty-tasks", label: "Momentum", body: "Complete 50 tasks", emoji: "🔥", threshold: 50 },
  { id: "hundred-tasks", label: "Century Club", body: "Complete 100 tasks", emoji: "🏆", threshold: 100 },
];

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mood, setMood] = useState(user?.moodToday || "");

  const xp = user?.xp || 0;
  const level = user?.level || 1;
  const xpIntoLevel = xp % 100;
  const completedCount = Math.floor(xp / 10);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const { user: updated } = await authService.updateMe({ name });
      setUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  async function handleMood(value) {
    setMood(value);
    const { user: updated } = await authService.updateMe({ moodToday: value });
    setUser(updated);
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="luxe-card p-7">
        <h3 className="font-display text-xl text-brown-dark mb-6">Profile</h3>
        <div className="flex items-center gap-4 mb-7">
          <span
            className="w-16 h-16 rounded-full flex items-center justify-center text-cream font-display text-2xl"
            style={{ background: user?.avatarColor || "#5B2D1D" }}
          >
            {user?.name?.[0]?.toUpperCase()}
          </span>
          <div>
            <p className="font-medium text-brown-dark">{user?.name}</p>
            <p className="text-sm text-ink/45">{user?.email}</p>
          </div>
        </div>
        <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} className="luxe-input flex-1 px-5 py-3 text-sm" />
          <button type="submit" disabled={saving} className="luxe-btn-primary px-6 py-3 text-sm whitespace-nowrap disabled:opacity-60">
            {saving ? "Saving…" : saved ? "Saved ✓" : "Save changes"}
          </button>
        </form>
      </div>

      <div className="luxe-card p-7">
        <h3 className="font-display text-xl text-brown-dark mb-2">Mood check-in</h3>
        <p className="text-sm text-ink/50 mb-5">How are you feeling today? We'll fold it into your weekly analytics.</p>
        <div className="flex flex-wrap gap-3">
          {MOODS.map((m) => (
            <button
              key={m.value}
              onClick={() => handleMood(m.value)}
              className={`flex flex-col items-center gap-1.5 px-5 py-4 rounded-2xl border-2 transition-all ${
                mood === m.value ? "border-gold bg-gold/10" : "border-brown/8 hover:border-brown/20"
              }`}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs text-ink/60">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="luxe-card p-7">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xl text-brown-dark">Level {level}</h3>
          <span className="text-sm text-ink/50">{xp} XP total</span>
        </div>
        <div className="h-2.5 rounded-full bg-brown/8 overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-gold to-brown rounded-full transition-all" style={{ width: `${xpIntoLevel}%` }} />
        </div>
        <p className="text-xs text-ink/40">{xpIntoLevel} / 100 XP to level {level + 1}</p>
      </div>

      <div className="luxe-card p-7">
        <h3 className="font-display text-xl text-brown-dark mb-5">Achievements</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BADGES.map((b) => {
            const earned = completedCount >= b.threshold;
            return (
              <div key={b.id} className={`text-center p-4 rounded-2xl border ${earned ? "border-gold/40 bg-gold/5" : "border-brown/8 opacity-40"}`}>
                <p className="text-3xl mb-2">{b.emoji}</p>
                <p className="text-xs font-medium text-brown-dark">{b.label}</p>
                <p className="text-[10px] text-ink/45 mt-1">{b.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
