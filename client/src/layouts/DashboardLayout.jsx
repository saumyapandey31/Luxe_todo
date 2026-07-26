import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import CommandPalette from "../components/CommandPalette";
import { TaskProvider } from "../hooks/useTasks";

const TITLES = {
  "/dashboard": "Overview",
  "/dashboard/tasks": "Tasks",
  "/dashboard/kanban": "Kanban Board",
  "/dashboard/calendar": "Calendar",
  "/dashboard/pomodoro": "Focus Timer",
  "/dashboard/analytics": "Analytics",
  "/dashboard/favorites": "Favorites",
  "/dashboard/archive": "Archive",
  "/dashboard/trash": "Trash",
  "/dashboard/profile": "Profile",
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const title = TITLES[location.pathname] || "Luxe";

  return (
    <TaskProvider>
      <div className="min-h-screen bg-bg flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 min-w-0 flex flex-col">
          <TopNavbar
            onMenuClick={() => setSidebarOpen(true)}
            onSearchClick={() => setPaletteOpen(true)}
            title={title}
          />
          <main className="flex-1 p-5 sm:p-8 max-w-[1600px] w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </TaskProvider>
  );
}
