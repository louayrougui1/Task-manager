const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  editProfile,
  refreshAccessToken,
  logoutUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.put("/editProfile", protect, upload.single("avatar"), editProfile);
router.get("/profile", protect, getMe);
router.post("/refreshToken", refreshAccessToken);
router.post("/logout", logoutUser);

module.exports = router;
