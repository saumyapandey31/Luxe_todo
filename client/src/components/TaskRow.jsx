import { useState, useRef, useEffect } from "react";
import { PriorityBadge, CategoryBadge } from "./Badges";
import { formatDate, isOverdue, isDueToday } from "../utils/constants";

export default function TaskRow({ task, onToggleComplete, onToggleFavorite, onEdit, onDuplicate, onArchive, onTrash, onRestore, onDeleteForever, selected, onSelect, trashView }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const overdue = isOverdue(task);
  const dueToday = isDueToday(task);

  return (
    <div className={`luxe-card luxe-card-hover px-5 py-4 flex items-center gap-4 ${task.completed ? "opacity-60" : ""}`}>
      {onSelect && (
        <input
          type="checkbox"
          checked={!!selected}
          onChange={() => onSelect(task.id)}
          className="w-4 h-4 rounded accent-brown shrink-0"
        />
      )}

      {onToggleComplete && (
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
            task.completed ? "bg-success border-success text-white" : "border-brown/25 hover:border-brown"
          }`}
        >
          {task.completed && <span className="text-xs">✓</span>}
        </button>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-[15px] font-medium text-brown-dark truncate ${task.completed ? "line-through" : ""}`}>
            {task.title}
          </p>
          {task.favorite && <span className="text-gold text-sm">♥</span>}
        </div>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <PriorityBadge priority={task.priority} />
          <CategoryBadge category={task.category} />
          {task.dueDate && (
            <span className={`text-xs ${overdue ? "text-danger" : dueToday ? "text-gold" : "text-ink/45"}`}>
              {overdue ? "Overdue: " : dueToday ? "Due today" : "Due "}
              {!dueToday && formatDate(task.dueDate)}
            </span>
          )}
          {task.tags?.map((t) => (
            <span key={t} className="text-xs text-ink/40">#{t}</span>
          ))}
        </div>
      </div>

      <div className="relative shrink-0" ref={ref}>
        <button onClick={() => setMenuOpen(!menuOpen)} className="w-9 h-9 rounded-full hover:bg-cream/70 text-ink/50 flex items-center justify-center">
          ⋯
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-44 luxe-card p-1.5 luxe-fade-in z-10">
            {trashView ? (
              <>
                <button onClick={() => { onRestore(task.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-cream/70">Restore</button>
                <button onClick={() => { onDeleteForever(task.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-sm text-danger hover:bg-danger/10">Delete forever</button>
              </>
            ) : task.archived ? (
              <>
                <button onClick={() => { onRestore(task.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-cream/70">Restore</button>
                <button onClick={() => { onTrash(task.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-sm text-danger hover:bg-danger/10">Move to trash</button>
              </>
            ) : (
              <>
                {onEdit && <button onClick={() => { onEdit(task); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-cream/70">Edit</button>}
                {onToggleFavorite && <button onClick={() => { onToggleFavorite(task.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-cream/70">{task.favorite ? "Unfavorite" : "Favorite"}</button>}
                {onDuplicate && <button onClick={() => { onDuplicate(task.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-cream/70">Duplicate</button>}
                {onArchive && <button onClick={() => { onArchive(task.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-cream/70">Archive</button>}
                {onTrash && <button onClick={() => { onTrash(task.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-sm text-danger hover:bg-danger/10">Move to trash</button>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
