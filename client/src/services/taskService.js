import api from "./api";

export async function fetchTasks(params = {}) {
  const { data } = await api.get("/tasks", { params });
  return data;
}

export async function createTask(payload) {
  const { data } = await api.post("/tasks", payload);
  return data;
}

export async function updateTask(id, payload) {
  const { data } = await api.patch(`/tasks/${id}`, payload);
  return data;
}

export async function toggleComplete(id) {
  const { data } = await api.patch(`/tasks/${id}/complete`);
  return data;
}

export async function toggleFavorite(id) {
  const { data } = await api.patch(`/tasks/${id}/favorite`);
  return data;
}

export async function archiveTask(id) {
  const { data } = await api.patch(`/tasks/${id}/archive`);
  return data;
}

export async function restoreTask(id) {
  const { data } = await api.patch(`/tasks/${id}/restore`);
  return data;
}

export async function trashTask(id) {
  const { data } = await api.patch(`/tasks/${id}/trash`);
  return data;
}

export async function deleteTaskPermanently(id) {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
}

export async function duplicateTask(id) {
  const { data } = await api.post(`/tasks/${id}/duplicate`);
  return data;
}

export async function bulkAction(ids, action) {
  const { data } = await api.post("/tasks/bulk", { ids, action });
  return data;
}

export async function fetchAnalytics() {
  const { data } = await api.get("/tasks/analytics");
  return data;
}

export default {
  fetchTasks,
  createTask,
  updateTask,
  toggleComplete,
  toggleFavorite,
  archiveTask,
  restoreTask,
  trashTask,
  deleteTaskPermanently,
  duplicateTask,
  bulkAction,
  fetchAnalytics,
};
