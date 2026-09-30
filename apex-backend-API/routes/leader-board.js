const express = require("express");
const router = express.Router();
const {
  createLeaderBoard,
  getLeaderBoards,
  updateLeaderBoard,
  deleteLeaderBoard,
  getLeaderBoardById
} = require("../controller/leader-board");

// Routes
router.post("/post", createLeaderBoard);
router.get("/get", getLeaderBoards);
router.put("/update/:id", updateLeaderBoard);
router.delete("/delete/:id", deleteLeaderBoard);
router.get("/get/:id", getLeaderBoardById);
module.exports = router;
