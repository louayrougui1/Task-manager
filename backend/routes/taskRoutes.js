const express = require("express");
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  deleteTasks,
} = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getTasks);
router.post("/", protect, addTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.delete("/", protect, deleteTasks);

module.exports = router;
