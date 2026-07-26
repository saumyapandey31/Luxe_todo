import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();
  const { tasks, addTask } = useTasks();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (open && e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const navItems = [
    { label: "Go to Overview", to: "/dashboard" },
    { label: "Go to Tasks", to: "/dashboard/tasks" },
    { label: "Go to Kanban Board", to: "/dashboard/kanban" },
    { label: "Go to Calendar", to: "/dashboard/calendar" },
    { label: "Go to Focus Timer", to: "/dashboard/pomodoro" },
    { label: "Go to Analytics", to: "/dashboard/analytics" },
  ].filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  const matchingTasks = query
    ? tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  const canCreate = query.trim().length > 1;

  async function handleCreate() {
    await addTask({ title: query.trim() });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-brown-dark/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-xl luxe-card luxe-fade-in overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-6 py-4 border-b border-brown/8">
          <span className="text-brown/40">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks, jump to a page, or type to create…"
            className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink/35"
            onKeyDown={(e) => {
              if (e.key === "Enter" && canCreate && matchingTasks.length === 0 && navItems.length === 0) {
                handleCreate();
              }
            }}
          />
          <kbd className="px-1.5 py-0.5 rounded bg-cream border border-brown/15 text-[10px] text-brown/60">Esc</kbd>
        </div>

        <div className="max-h-80 overflow-y-auto py-2">
          {navItems.length > 0 && (
            <div className="px-3 pb-1">
              <p className="px-3 py-1 text-[11px] uppercase tracking-wider text-brown/40">Navigate</p>
              {navItems.map((item) => (
                <button
                  key={item.to}
                  onClick={() => { navigate(item.to); onClose(); }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-ink/75 hover:bg-cream/70"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {matchingTasks.length > 0 && (
            <div className="px-3 pb-1">
              <p className="px-3 py-1 text-[11px] uppercase tracking-wider text-brown/40">Tasks</p>
              {matchingTasks.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { navigate("/dashboard/tasks"); onClose(); }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-ink/75 hover:bg-cream/70 flex items-center gap-2"
                >
                  <span className={t.completed ? "line-through text-ink/40" : ""}>{t.title}</span>
                </button>
              ))}
            </div>
          )}

          {canCreate && navItems.length === 0 && (
            <div className="px-3">
              <button
                onClick={handleCreate}
                className="w-full text-left px-3 py-3 rounded-xl text-sm text-brown hover:bg-cream/70 flex items-center gap-2"
              >
                <span className="text-gold">+</span> Create task “{query.trim()}”
              </button>
            </div>
          )}

          {!query && (
            <p className="px-6 py-6 text-sm text-ink/40 text-center">Start typing to search or create a task.</p>
          )}
        </div>
      </div>
    </div>
  );
}
