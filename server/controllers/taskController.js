import { v4 as uuidv4 } from "uuid";
import {
  getTasksByUser,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskPermanently,
  bulkUpdate,
  bulkDelete,
} from "../models/taskModel.js";
import { updateUser, findUserById } from "../models/userModel.js";

export async function listTasks(req, res, next) {
  try {
    let tasks = getTasksByUser(req.user.id);
    const { search, category, priority, status, tag, view, sort } = req.query;

    if (view === "trash") tasks = tasks.filter((t) => t.trashed);
    else if (view === "archived") tasks = tasks.filter((t) => t.archived && !t.trashed);
    else if (view === "favorites") tasks = tasks.filter((t) => t.favorite && !t.trashed && !t.archived);
    else if (view === "completed") tasks = tasks.filter((t) => t.completed && !t.trashed && !t.archived);
    else tasks = tasks.filter((t) => !t.trashed && !t.archived);

    if (search) {
      const q = search.toLowerCase();
      tasks = tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.notes || "").toLowerCase().includes(q)
      );
    }
    if (category) tasks = tasks.filter((t) => t.category === category);
    if (priority) tasks = tasks.filter((t) => t.priority === priority);
    if (status) tasks = tasks.filter((t) => t.status === status);
    if (tag) tasks = tasks.filter((t) => (t.tags || []).includes(tag));

    switch (sort) {
      case "dueDate":
        tasks.sort((a, b) => new Date(a.dueDate || "2999-01-01") - new Date(b.dueDate || "2999-01-01"));
        break;
      case "priority": {
        const order = { high: 0, medium: 1, low: 2 };
        tasks.sort((a, b) => (order[a.priority] ?? 3) - (order[b.priority] ?? 3));
        break;
      }
      case "alphabetical":
        tasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json({ success: true, count: tasks.length, tasks });
  } catch (err) {
    next(err);
  }
}

export async function getTask(req, res, next) {
  try {
    const task = getTaskById(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ success: false, message: "Task not found." });
    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
}

export async function createNewTask(req, res, next) {
  try {
    const now = new Date().toISOString();
    const {
      title,
      notes = "",
      category = "General",
      tags = [],
      priority = "medium",
      dueDate = null,
      reminder = null,
      recurring = "none",
      status = "todo",
    } = req.body;

    const task = createTask({
      id: uuidv4(),
      userId: req.user.id,
      title: title.trim(),
      notes,
      category,
      tags,
      priority,
      dueDate,
      reminder,
      recurring,
      status,
      completed: false,
      favorite: false,
      archived: false,
      trashed: false,
      createdAt: now,
      updatedAt: now,
    });
    res.status(201).json({ success: true, task });
  } catch (err) {
    next(err);
  }
}

export async function editTask(req, res, next) {
  try {
    const task = updateTask(req.params.id, req.user.id, req.body);
    if (!task) return res.status(404).json({ success: false, message: "Task not found." });
    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
}

export async function toggleComplete(req, res, next) {
  try {
    const existing = getTaskById(req.params.id, req.user.id);
    if (!existing) return res.status(404).json({ success: false, message: "Task not found." });
    const completed = !existing.completed;
    const task = updateTask(req.params.id, req.user.id, {
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    });

    if (completed) {
      const user = findUserById(req.user.id);
      if (user) {
        const xp = (user.xp || 0) + 10;
        const level = Math.floor(xp / 100) + 1;
        updateUser(user.id, { xp, level });
      }
    }
    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
}

export async function toggleFavorite(req, res, next) {
  try {
    const existing = getTaskById(req.params.id, req.user.id);
    if (!existing) return res.status(404).json({ success: false, message: "Task not found." });
    const task = updateTask(req.params.id, req.user.id, { favorite: !existing.favorite });
    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
}

export async function archiveTask(req, res, next) {
  try {
    const task = updateTask(req.params.id, req.user.id, { archived: true });
    if (!task) return res.status(404).json({ success: false, message: "Task not found." });
    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
}

export async function restoreTask(req, res, next) {
  try {
    const task = updateTask(req.params.id, req.user.id, { archived: false, trashed: false });
    if (!task) return res.status(404).json({ success: false, message: "Task not found." });
    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
}

export async function trashTask(req, res, next) {
  try {
    const task = updateTask(req.params.id, req.user.id, { trashed: true });
    if (!task) return res.status(404).json({ success: false, message: "Task not found." });
    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
}

export async function permanentlyDeleteTask(req, res, next) {
  try {
    const ok = deleteTaskPermanently(req.params.id, req.user.id);
    if (!ok) return res.status(404).json({ success: false, message: "Task not found." });
    res.json({ success: true, message: "Task permanently deleted." });
  } catch (err) {
    next(err);
  }
}

export async function duplicateTask(req, res, next) {
  try {
    const existing = getTaskById(req.params.id, req.user.id);
    if (!existing) return res.status(404).json({ success: false, message: "Task not found." });
    const now = new Date().toISOString();
    const copy = createTask({
      ...existing,
      id: uuidv4(),
      title: `${existing.title} (copy)`,
      completed: false,
      createdAt: now,
      updatedAt: now,
    });
    res.status(201).json({ success: true, task: copy });
  } catch (err) {
    next(err);
  }
}

export async function bulkAction(req, res, next) {
  try {
    const { ids, action } = req.body;
    if (!Array.isArray(ids) || !ids.length) {
      return res.status(400).json({ success: false, message: "No tasks selected." });
    }
    let changed = 0;
    switch (action) {
      case "complete":
        changed = bulkUpdate(ids, req.user.id, { completed: true, completedAt: new Date().toISOString() });
        break;
      case "archive":
        changed = bulkUpdate(ids, req.user.id, { archived: true });
        break;
      case "trash":
        changed = bulkUpdate(ids, req.user.id, { trashed: true });
        break;
      case "restore":
        changed = bulkUpdate(ids, req.user.id, { archived: false, trashed: false });
        break;
      case "delete":
        changed = bulkDelete(ids, req.user.id);
        break;
      default:
        return res.status(400).json({ success: false, message: "Unknown bulk action." });
    }
    res.json({ success: true, changed });
  } catch (err) {
    next(err);
  }
}

export async function getAnalytics(req, res, next) {
  try {
    const tasks = getTasksByUser(req.user.id).filter((t) => !t.trashed);
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const completionRate = total ? Math.round((completed / total) * 100) : 0;

    const byCategory = {};
    tasks.forEach((t) => {
      byCategory[t.category] = (byCategory[t.category] || 0) + 1;
    });

    const last7 = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toISOString().slice(0, 10);
      const count = tasks.filter((t) => t.completedAt && t.completedAt.slice(0, 10) === key).length;
      return { date: key, completed: count };
    });

    const overdue = tasks.filter(
      (t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
    ).length;

    res.json({
      success: true,
      analytics: { total, completed, completionRate, byCategory, weekly: last7, overdue },
    });
  } catch (err) {
    next(err);
  }
}

export default {
  listTasks,
  getTask,
  createNewTask,
  editTask,
  toggleComplete,
  toggleFavorite,
  archiveTask,
  restoreTask,
  trashTask,
  permanentlyDeleteTask,
  duplicateTask,
  bulkAction,
  getAnalytics,
};
