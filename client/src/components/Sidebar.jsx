import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", icon: "◇", end: true },
  { to: "/dashboard/tasks", label: "Tasks", icon: "☰" },
  { to: "/dashboard/kanban", label: "Kanban", icon: "▤" },
  { to: "/dashboard/calendar", label: "Calendar", icon: "▦" },
  { to: "/dashboard/pomodoro", label: "Focus Timer", icon: "◷" },
  { to: "/dashboard/analytics", label: "Analytics", icon: "◈" },
  { to: "/dashboard/favorites", label: "Favorites", icon: "♥" },
  { to: "/dashboard/archive", label: "Archive", icon: "▢" },
  { to: "/dashboard/trash", label: "Trash", icon: "✕" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-brown-dark/40 z-30 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-card border-r border-brown/8 z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-20 flex items-center gap-2.5 px-7 border-b border-brown/8">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-brown to-brown-dark flex items-center justify-center text-cream font-display">L</span>
          <span className="font-display text-xl text-brown-dark">Luxe</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[15px] transition-all ${
                  isActive
                    ? "bg-brown-dark text-cream shadow-sm"
                    : "text-ink/65 hover:bg-cream/70 hover:text-brown-dark"
                }`
              }
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-5 mx-4 mb-6 rounded-2xl bg-cream/60 border border-brown/8">
          <p className="text-xs text-brown/50 mb-1">Command Palette</p>
          <p className="text-sm text-brown-dark font-medium">
            Press <kbd className="px-1.5 py-0.5 rounded bg-card border border-brown/15 text-xs">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-card border border-brown/15 text-xs">K</kbd>
          </p>
        </div>
      </aside>
    </>
  );
}
