import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { getGreeting, getTodayQuote, formatDate, isOverdue } from "../utils/constants";
import { PriorityBadge } from "../components/Badges";

export default function DashboardHome() {
  const { user } = useAuth();
  const { tasks, loading, complete } = useTasks();
  const quote = useMemo(() => getTodayQuote(), []);

  const activeTasks = tasks.filter((t) => !t.completed);
  const focusTask = useMemo(() => {
    const overdueOrHigh = activeTasks.filter((t) => t.priority === "high" || isOverdue(t));
    return overdueOrHigh[0] || activeTasks[0] || null;
  }, [activeTasks]);

  const upcoming = activeTasks
    .filter((t) => t.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const recentActivity = tasks
    .filter((t) => t.completed)
    .sort((a, b) => new Date(b.completedAt || b.updatedAt) - new Date(a.completedAt || a.updatedAt))
    .slice(0, 5);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const score = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl text-brown-dark mb-1">{getGreeting(user?.name)}</h2>
        <p className="text-ink/55">Here's a considered look at your day.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Daily Focus */}
        <div className="lg:col-span-2 luxe-card p-7 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-beige/30 blur-2xl" />
          <span className="luxe-pill inline-block px-3 py-1 bg-cream text-brown mb-5 relative">Today's Focus</span>
          {loading ? (
            <div className="luxe-skeleton h-24" />
          ) : focusTask ? (
            <div className="relative">
              <h3 className="font-display text-2xl text-brown-dark mb-3">{focusTask.title}</h3>
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <PriorityBadge priority={focusTask.priority} />
                {focusTask.dueDate && <span className="text-xs text-ink/45">Due {formatDate(focusTask.dueDate)}</span>}
              </div>
              <button onClick={() => complete(focusTask.id)} className="luxe-btn-primary px-6 py-2.5 text-sm">
                Mark complete
              </button>
            </div>
          ) : (
            <div className="relative">
              <p className="text-ink/55 mb-4">All clear — no urgent task standing out today.</p>
              <Link to="/dashboard/tasks" className="luxe-btn-ghost inline-block px-6 py-2.5 text-sm">Plan your day</Link>
            </div>
          )}
        </div>

        {/* Productivity score */}
        <div className="luxe-card p-7 flex flex-col items-center justify-center text-center">
          <p className="text-xs uppercase tracking-widest text-brown/45 mb-4">Productivity Score</p>
          <div className="relative w-28 h-28 flex items-center justify-center mb-2">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="48" fill="none" stroke="rgba(91,45,29,0.08)" strokeWidth="8" />
              <circle
                cx="56" cy="56" r="48" fill="none" stroke="#C8A165" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 48}
                strokeDashoffset={2 * Math.PI * 48 * (1 - score / 100)}
              />
            </svg>
            <span className="font-display text-3xl text-brown-dark">{score}</span>
          </div>
          <p className="text-xs text-ink/45">{completedCount} of {totalCount} tasks complete</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Daily quote */}
        <div className="luxe-card p-7 bg-brown-dark text-cream">
          <p className="text-xs uppercase tracking-widest text-gold/70 mb-4">Daily Quote</p>
          <p className="font-display text-xl leading-snug mb-4">"{quote.quote}"</p>
          <p className="text-sm text-cream/50">— {quote.author}</p>
        </div>

        {/* Upcoming tasks */}
        <div className="luxe-card p-7">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg text-brown-dark">Upcoming</h3>
            <Link to="/dashboard/calendar" className="text-xs text-brown hover:text-brown-dark">View calendar</Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-sm text-ink/40 py-6 text-center">No upcoming due dates</p>
          ) : (
            <div className="space-y-3">
              {upcoming.map((t) => (
                <div key={t.id} className="flex items-center justify-between">
                  <p className="text-sm text-ink/75 truncate pr-2">{t.title}</p>
                  <span className={`text-xs whitespace-nowrap ${isOverdue(t) ? "text-danger" : "text-ink/40"}`}>{formatDate(t.dueDate)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div className="luxe-card p-7">
          <h3 className="font-display text-lg text-brown-dark mb-5">Recent Activity</h3>
          {recentActivity.length === 0 ? (
            <p className="text-sm text-ink/40 py-6 text-center">Complete a task to see it here</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((t) => (
                <div key={t.id} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-success/15 text-success flex items-center justify-center text-[10px] shrink-0">✓</span>
                  <p className="text-sm text-ink/70 truncate">{t.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
