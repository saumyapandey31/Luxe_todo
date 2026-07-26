import { useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { STATUSES, PRIORITIES } from "../utils/constants";
import TaskModal from "../components/TaskModal";

function KanbanCard({ task, onDragStart, onEdit }) {
  const p = PRIORITIES.find((x) => x.value === task.priority) || PRIORITIES[1];
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onEdit(task)}
      className="luxe-card luxe-card-hover p-4 cursor-grab active:cursor-grabbing"
    >
      <p className="text-sm font-medium text-brown-dark mb-2 leading-snug">{task.title}</p>
      <div className="flex items-center justify-between">
        <span className="luxe-pill px-2 py-0.5" style={{ background: `${p.color}18`, color: p.color }}>{p.label}</span>
        <span className="text-xs text-ink/40">{task.category}</span>
      </div>
    </div>
  );
}

export default function KanbanPage() {
  const { tasks, loading, setView, setFilters, editTask, addTask } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  useEffect(() => {
    setView("active");
    setFilters((f) => ({ ...f, sort: "newest" }));
  }, [setView, setFilters]);

  function handleDragStart(e, id) {
    e.dataTransfer.setData("taskId", id);
  }

  async function handleDrop(e, status) {
    e.preventDefault();
    setDragOverCol(null);
    const id = e.dataTransfer.getData("taskId");
    const task = tasks.find((t) => t.id === id);
    if (task && task.status !== status) {
      await editTask(id, { status, completed: status === "completed" });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-ink/55 text-sm">Drag cards between columns to update their status.</p>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="luxe-btn-primary px-6 py-2.5 text-sm">
          + New task
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATUSES.map((col) => {
          const colTasks = tasks.filter((t) => (t.status || "todo") === col.value);
          return (
            <div
              key={col.value}
              onDragOver={(e) => { e.preventDefault(); setDragOverCol(col.value); }}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={(e) => handleDrop(e, col.value)}
              className={`rounded-3xl p-4 min-h-[400px] transition-colors ${dragOverCol === col.value ? "bg-gold/10" : "bg-cream/40"}`}
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-display text-lg text-brown-dark">{col.label}</h3>
                <span className="luxe-pill px-2 py-0.5 bg-card text-brown/60">{colTasks.length}</span>
              </div>
              <div className="space-y-3">
                {loading ? (
                  <div className="luxe-skeleton h-24" />
                ) : (
                  colTasks.map((t) => (
                    <KanbanCard key={t.id} task={t} onDragStart={handleDragStart} onEdit={(task) => { setEditing(task); setModalOpen(true); }} />
                  ))
                )}
                {!loading && colTasks.length === 0 && (
                  <p className="text-xs text-ink/35 text-center py-8">Drop tasks here</p>
                )}
              </div>
            </div>
          );
        })}
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
