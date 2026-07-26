import { readCollection, writeCollection } from "../utils/jsonDb.js";

const COLLECTION = "tasks";

export function getAllTasks() {
  return readCollection(COLLECTION);
}

export function getTasksByUser(userId) {
  return getAllTasks().filter((t) => t.userId === userId);
}

export function getTaskById(id, userId) {
  return getAllTasks().find((t) => t.id === id && t.userId === userId);
}

export function createTask(task) {
  const tasks = getAllTasks();
  tasks.push(task);
  writeCollection(COLLECTION, tasks);
  return task;
}

export function updateTask(id, userId, updates) {
  const tasks = getAllTasks();
  const idx = tasks.findIndex((t) => t.id === id && t.userId === userId);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...updates, updatedAt: new Date().toISOString() };
  writeCollection(COLLECTION, tasks);
  return tasks[idx];
}

export function deleteTaskPermanently(id, userId) {
  const tasks = getAllTasks();
  const filtered = tasks.filter((t) => !(t.id === id && t.userId === userId));
  writeCollection(COLLECTION, filtered);
  return filtered.length !== tasks.length;
}

export function bulkUpdate(ids, userId, updates) {
  const tasks = getAllTasks();
  let changed = 0;
  const next = tasks.map((t) => {
    if (ids.includes(t.id) && t.userId === userId) {
      changed++;
      return { ...t, ...updates, updatedAt: new Date().toISOString() };
    }
    return t;
  });
  writeCollection(COLLECTION, next);
  return changed;
}

export function bulkDelete(ids, userId) {
  const tasks = getAllTasks();
  const filtered = tasks.filter((t) => !(ids.includes(t.id) && t.userId === userId));
  writeCollection(COLLECTION, filtered);
  return tasks.length - filtered.length;
}

export default {
  getAllTasks,
  getTasksByUser,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskPermanently,
  bulkUpdate,
  bulkDelete,
};
