const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.status(200).json(tasks);
});

const addTask = asyncHandler(async (req, res) => {
  const { text, priority } = req.body;
  if (!text || !priority) {
    res.status(400);
    throw new Error("please provide a text field / priority in the task");
  }
  const task = await Task.create({
    user: req.user._id,
    text: text,
    priority: priority,
    completed: false,
  });
  res.status(201).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  const { text, priority, completed } = req.body;
  if (req.user._id.toString() !== task.user.toString()) {
    res.status(403);
    throw new Error("User not Authorized to update this Task");
  }
  const newTask = {
    user: task.user,
    text: text ? text : task.text,
    priority: priority ? priority : task.priority,
    completed: completed ? completed : task.completed,
  };
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, newTask, {
    new: true,
  });
  res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (req.user._id.toString() !== task.user.toString()) {
    res.status(403);
    throw new Error("User not Authorized to update this Task");
  }
  await task.deleteOne();
  res.status(200).json({ id: req.params.id });
});

const deleteTasks = asyncHandler(async (req, res) => {
  if (req.user._id.toString() !== task.user.toString()) {
    res.status(403);
    throw new Error("User not Authorized to update this Task");
  }
  await Task.deleteMany({ user: req.user._id });
  res.status(200).json({ id: req.params.id });
});

module.exports = { getTasks, addTask, updateTask, deleteTask, deleteTasks };
