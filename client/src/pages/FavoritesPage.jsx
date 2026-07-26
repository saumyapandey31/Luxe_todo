import { useEffect } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskRow from "../components/TaskRow";
import EmptyState from "../components/EmptyState";

export default function FavoritesPage() {
  const { tasks, loading, setView, complete, favorite, archive, trash, duplicate } = useTasks();

  useEffect(() => { setView("favorites"); }, [setView]);

  return (
    <div className="space-y-4">
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => <div key={i} className="luxe-skeleton h-20" />)
      ) : tasks.length === 0 ? (
        <EmptyState icon="♥" title="No favorites yet" body="Mark a task as a favorite from its menu to pin it here." />
      ) : (
        tasks.map((t) => (
          <TaskRow key={t.id} task={t} onToggleComplete={complete} onToggleFavorite={favorite} onDuplicate={duplicate} onArchive={archive} onTrash={trash} />
        ))
      )}
    </div>
  );
}
