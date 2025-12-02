const express = require("express");
const {
  getAllCanvases,
  createCanvas,
  loadCanvas,
  updateCanvas,
  deleteCanvas
} = require("../controllers/canvasController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAllCanvases);
router.post("/", authMiddleware, createCanvas);
router.get("/:id", authMiddleware, loadCanvas);
router.put("/update/:id", authMiddleware, updateCanvas);
router.delete("/delete/:id", authMiddleware, deleteCanvas)

module.exports = router;
