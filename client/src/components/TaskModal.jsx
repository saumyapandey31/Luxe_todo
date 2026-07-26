import { useState, useEffect } from "react";
import { CATEGORIES, PRIORITIES } from "../utils/constants";

const EMPTY = {
  title: "",
  notes: "",
  category: "General",
  priority: "medium",
  dueDate: "",
  reminder: "",
  recurring: "none",
  tags: "",
};

export default function TaskModal({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              title: initial.title || "",
              notes: initial.notes || "",
              category: initial.category || "General",
              priority: initial.priority || "medium",
              dueDate: initial.dueDate ? initial.dueDate.slice(0, 10) : "",
              reminder: initial.reminder ? initial.reminder.slice(0, 10) : "",
              recurring: initial.recurring || "none",
              tags: (initial.tags || []).join(", "),
            }
          : EMPTY
      );
    }
  }, [open, initial]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      await onSubmit({
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        dueDate: form.dueDate || null,
        reminder: form.reminder || null,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brown-dark/40 backdrop-blur-sm" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-lg luxe-card luxe-fade-in max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-brown/8">
          <h3 className="font-display text-xl text-brown-dark">{initial ? "Edit task" : "New task"}</h3>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full hover:bg-cream/70 text-ink/50">✕</button>
        </div>

        <div className="p-7 space-y-5">
          <div className="relative">
            <input
              autoFocus
              required
              placeholder=" "
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="luxe-input peer w-full px-5 pt-6 pb-2.5 text-sm"
            />
            <label className="absolute left-5 top-2 text-xs text-brown/50 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-ink/40 peer-focus:top-2 peer-focus:text-xs transition-all pointer-events-none">
              Title
            </label>
          </div>

          <div className="relative">
            <textarea
              placeholder=" "
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="luxe-input peer w-full px-5 pt-6 pb-2.5 text-sm resize-none"
            />
            <label className="absolute left-5 top-2 text-xs text-brown/50 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-ink/40 peer-focus:top-2 peer-focus:text-xs transition-all pointer-events-none">
              Notes
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-brown/50 mb-1.5 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="luxe-input w-full px-4 py-3 text-sm"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-brown/50 mb-1.5 block">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="luxe-input w-full px-4 py-3 text-sm"
              >
                {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-brown/50 mb-1.5 block">Due date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="luxe-input w-full px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-brown/50 mb-1.5 block">Reminder</label>
              <input
                type="date"
                value={form.reminder}
                onChange={(e) => setForm({ ...form, reminder: e.target.value })}
                className="luxe-input w-full px-4 py-3 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-brown/50 mb-1.5 block">Recurring</label>
            <select
              value={form.recurring}
              onChange={(e) => setForm({ ...form, recurring: e.target.value })}
              className="luxe-input w-full px-4 py-3 text-sm"
            >
              <option value="none">Does not repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="relative">
            <input
              placeholder=" "
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="luxe-input peer w-full px-5 pt-6 pb-2.5 text-sm"
            />
            <label className="absolute left-5 top-2 text-xs text-brown/50 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-ink/40 peer-focus:top-2 peer-focus:text-xs transition-all pointer-events-none">
              Tags (comma separated)
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-7 py-5 border-t border-brown/8">
          <button type="button" onClick={onClose} className="luxe-btn-ghost px-6 py-2.5 text-sm">Cancel</button>
          <button type="submit" disabled={saving} className="luxe-btn-primary px-7 py-2.5 text-sm disabled:opacity-60">
            {saving ? "Saving…" : initial ? "Save changes" : "Create task"}
          </button>
        </div>
      </form>
    </div>
  );
}
