import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskModal from "../components/TaskModal";
import TaskRow from "../components/TaskRow";
import EmptyState from "../components/EmptyState";
import { CATEGORIES, PRIORITIES } from "../utils/constants";

const VIEW_TABS = [
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function TasksPage() {
  const { tasks, loading, view, setView, filters, setFilters, addTask, editTask, complete, favorite, archive, trash, duplicate, bulk } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState([]);

  function toggleSelect(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  async function handleBulk(action) {
    if (!selected.length) return;
    await bulk(selected, action);
    setSelected([]);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1 luxe-card p-1 w-fit">
          {VIEW_TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setView(t.value)}
              className={`px-4 py-2 rounded-2xl text-sm transition-all ${view === t.value ? "bg-brown-dark text-cream" : "text-ink/60 hover:text-brown-dark"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="luxe-btn-primary px-6 py-3 text-sm">
          + New task
        </button>
      </div>

      <div className="luxe-card p-4 flex flex-wrap items-center gap-3">
        <input
          placeholder="Search tasks…"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="luxe-input flex-1 min-w-[180px] px-4 py-2.5 text-sm"
        />
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="luxe-input px-3 py-2.5 text-sm">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })} className="luxe-input px-3 py-2.5 text-sm">
          <option value="">All priorities</option>
          {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
        <select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })} className="luxe-input px-3 py-2.5 text-sm">
          <option value="newest">Newest first</option>
          <option value="dueDate">Due date</option>
          <option value="priority">Priority</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      {selected.length > 0 && (
        <div className="luxe-card px-5 py-3 flex items-center gap-3 flex-wrap luxe-fade-in">
          <span className="text-sm text-brown-dark font-medium">{selected.length} selected</span>
          <button onClick={() => handleBulk("complete")} className="luxe-btn-ghost px-4 py-1.5 text-xs">Complete</button>
          <button onClick={() => handleBulk("archive")} className="luxe-btn-ghost px-4 py-1.5 text-xs">Archive</button>
          <button onClick={() => handleBulk("trash")} className="luxe-btn-ghost px-4 py-1.5 text-xs text-danger">Trash</button>
          <button onClick={() => setSelected([])} className="ml-auto text-xs text-ink/40 hover:text-ink/70">Clear</button>
        </div>
      )}

      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <div key={i} className="luxe-skeleton h-20" />)
        ) : tasks.length === 0 ? (
          <EmptyState
            icon="✧"
            title="Nothing here yet"
            body="Create your first task and Luxe will help you keep the important ones in view."
            action={<button onClick={() => setModalOpen(true)} className="luxe-btn-primary px-6 py-2.5 text-sm">Create a task</button>}
          />
        ) : (
          tasks.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              selected={selected.includes(t.id)}
              onSelect={toggleSelect}
              onToggleComplete={complete}
              onToggleFavorite={favorite}
              onEdit={(task) => { setEditing(task); setModalOpen(true); }}
              onDuplicate={duplicate}
              onArchive={archive}
              onTrash={trash}
            />
          ))
        )}
      </div>

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initial={editing}
        onSubmit={(payload) => (editing ? editTask(editing.id, payload) : addTask(payload))}
      />
    </div>
  );
}
