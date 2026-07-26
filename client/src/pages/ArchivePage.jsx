import { useEffect } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskRow from "../components/TaskRow";
import EmptyState from "../components/EmptyState";

export default function ArchivePage() {
  const { tasks, loading, setView, restore, trash } = useTasks();

  useEffect(() => { setView("archived"); }, [setView]);

  return (
    <div className="space-y-4">
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => <div key={i} className="luxe-skeleton h-20" />)
      ) : tasks.length === 0 ? (
        <EmptyState icon="▢" title="Archive is empty" body="Tasks you archive will be tucked away here, out of your active list but never lost." />
      ) : (
        tasks.map((t) => <TaskRow key={t.id} task={t} onRestore={restore} onTrash={trash} />)
      )}
    </div>
  );
}
