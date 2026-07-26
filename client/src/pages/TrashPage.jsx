import { useEffect } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskRow from "../components/TaskRow";
import EmptyState from "../components/EmptyState";

export default function TrashPage() {
  const { tasks, loading, setView, restore, remove, bulk } = useTasks();

  useEffect(() => { setView("trash"); }, [setView]);

  async function emptyTrash() {
    if (!tasks.length) return;
    if (window.confirm(`Permanently delete ${tasks.length} task(s)? This cannot be undone.`)) {
      await bulk(tasks.map((t) => t.id), "delete");
    }
  }

  return (
    <div className="space-y-4">
      {tasks.length > 0 && (
        <div className="flex justify-end">
          <button onClick={emptyTrash} className="luxe-btn-ghost px-5 py-2 text-xs text-danger border-danger/30 hover:bg-danger/10">
            Empty trash
          </button>
        </div>
      )}
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => <div key={i} className="luxe-skeleton h-20" />)
      ) : tasks.length === 0 ? (
        <EmptyState icon="✕" title="Trash is empty" body="Deleted tasks appear here for 30 days before Luxe clears them for good." />
      ) : (
        tasks.map((t) => <TaskRow key={t.id} task={t} trashView onRestore={restore} onDeleteForever={remove} />)
      )}
    </div>
  );
}
