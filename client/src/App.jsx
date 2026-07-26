import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardHome from "./pages/DashboardHome";
import TasksPage from "./pages/TasksPage";
import KanbanPage from "./pages/KanbanPage";
import CalendarPage from "./pages/CalendarPage";
import PomodoroPage from "./pages/PomodoroPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import FavoritesPage from "./pages/FavoritesPage";
import ArchivePage from "./pages/ArchivePage";
import TrashPage from "./pages/TrashPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="kanban" element={<KanbanPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="pomodoro" element={<PomodoroPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="archive" element={<ArchivePage />} />
            <Route path="trash" element={<TrashPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
