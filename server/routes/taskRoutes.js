import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { validateTask } from "../middleware/validate.js";
import {
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
} from "../controllers/taskController.js";

const router = express.Router();

router.use(protect);

router.get("/analytics", getAnalytics);
router.post("/bulk", bulkAction);

router.get("/", listTasks);
router.post("/", validateTask, createNewTask);
router.get("/:id", getTask);
router.patch("/:id", validateTask, editTask);
router.patch("/:id/complete", toggleComplete);
router.patch("/:id/favorite", toggleFavorite);
router.patch("/:id/archive", archiveTask);
router.patch("/:id/restore", restoreTask);
router.patch("/:id/trash", trashTask);
router.delete("/:id", permanentlyDeleteTask);
router.post("/:id/duplicate", duplicateTask);

export default router;
