const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  editProfile,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.put("/editProfile", protect, upload.single("avatar"), editProfile);
router.get("/profile", protect, getMe);

module.exports = router;
