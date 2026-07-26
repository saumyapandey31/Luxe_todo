import { useEffect, useState, useMemo } from "react";
import { useTasks } from "../hooks/useTasks";
import { PRIORITIES } from "../utils/constants";

function getMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function CalendarPage() {
  const { tasks, setView } = useTasks();
  const [cursor, setCursor] = useState(new Date());

  useEffect(() => { setView("active"); }, [setView]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const cells = useMemo(() => getMonthGrid(year, month), [year, month]);

  const tasksByDay = useMemo(() => {
    const map = {};
    tasks.forEach((t) => {
      if (!t.dueDate) return;
      const d = new Date(t.dueDate);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        map[day] = map[day] || [];
        map[day].push(t);
      }
    });
    return map;
  }, [tasks, year, month]);

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  return (
    <div className="space-y-6">
      <div className="luxe-card p-5 sm:p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl text-brown-dark">
            {cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="w-9 h-9 rounded-full border border-brown/15 hover:bg-cream/70 text-brown-dark">‹</button>
            <button onClick={() => setCursor(new Date())} className="luxe-btn-ghost px-4 py-2 text-xs">Today</button>
            <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="w-9 h-9 rounded-full border border-brown/15 hover:bg-cream/70 text-brown-dark">›</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center text-xs uppercase tracking-wide text-brown/40 py-2">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {cells.map((day, i) => {
            const dayTasks = day ? tasksByDay[day] || [] : [];
            const isToday = isCurrentMonth && day === today.getDate();
            return (
              <div
                key={i}
                className={`min-h-[90px] rounded-2xl p-2 border transition-colors ${
                  day ? "border-brown/8 bg-card hover:border-gold/40" : "border-transparent"
                } ${isToday ? "ring-2 ring-gold/50" : ""}`}
              >
                {day && (
                  <>
                    <p className={`text-xs mb-1.5 ${isToday ? "text-gold font-semibold" : "text-ink/50"}`}>{day}</p>
                    <div className="space-y-1">
                      {dayTasks.slice(0, 2).map((t) => {
                        const p = PRIORITIES.find((x) => x.value === t.priority) || PRIORITIES[1];
                        return (
                          <div
                            key={t.id}
                            title={t.title}
                            className="text-[10px] px-1.5 py-0.5 rounded-lg truncate"
                            style={{ background: `${p.color}18`, color: p.color }}
                          >
                            {t.title}
                          </div>
                        );
                      })}
                      {dayTasks.length > 2 && (
                        <p className="text-[10px] text-ink/35">+{dayTasks.length - 2} more</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
