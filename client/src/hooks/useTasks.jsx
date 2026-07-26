import { createContext, useContext, useState, useCallback, useEffect } from "react";
import * as taskService from "../services/taskService";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("active");
  const [filters, setFilters] = useState({ search: "", category: "", priority: "", tag: "", sort: "newest" });

  const refresh = useCallback(async (overrideParams = {}) => {
    setLoading(true);
    try {
      const params = { view, ...filters, ...overrideParams };
      Object.keys(params).forEach((k) => !params[k] && delete params[k]);
      const { tasks } = await taskService.fetchTasks(params);
      setTasks(tasks);
    } finally {
      setLoading(false);
    }
  }, [view, filters]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, filters]);

  const addTask = useCallback(async (payload) => {
    const { task } = await taskService.createTask(payload);
    await refresh();
    return task;
  }, [refresh]);

  const editTask = useCallback(async (id, payload) => {
    const { task } = await taskService.updateTask(id, payload);
    await refresh();
    return task;
  }, [refresh]);

  const complete = useCallback(async (id) => {
    await taskService.toggleComplete(id);
    await refresh();
  }, [refresh]);

  const favorite = useCallback(async (id) => {
    await taskService.toggleFavorite(id);
    await refresh();
  }, [refresh]);

  const archive = useCallback(async (id) => {
    await taskService.archiveTask(id);
    await refresh();
  }, [refresh]);

  const restore = useCallback(async (id) => {
    await taskService.restoreTask(id);
    await refresh();
  }, [refresh]);

  const trash = useCallback(async (id) => {
    await taskService.trashTask(id);
    await refresh();
  }, [refresh]);

  const remove = useCallback(async (id) => {
    await taskService.deleteTaskPermanently(id);
    await refresh();
  }, [refresh]);

  const duplicate = useCallback(async (id) => {
    await taskService.duplicateTask(id);
    await refresh();
  }, [refresh]);

  const bulk = useCallback(async (ids, action) => {
    await taskService.bulkAction(ids, action);
    await refresh();
  }, [refresh]);

  return (
    <TaskContext.Provider
      value={{
        tasks, loading, view, setView, filters, setFilters, refresh,
        addTask, editTask, complete, favorite, archive, restore, trash, remove, duplicate, bulk,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
}

export default useTasks;
