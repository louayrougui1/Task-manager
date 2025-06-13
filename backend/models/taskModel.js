const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  text: {
    type: String,
    required: [true, "please add a text value"],
  },
  priority: {
    type: Number,
    required: [true, "please add a priority"],
    min: [1, "lowest is 1"],
    max: [3, "highest is 3"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("tasks", taskSchema);
