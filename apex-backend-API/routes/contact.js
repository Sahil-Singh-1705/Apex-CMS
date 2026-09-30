const express = require("express");
const router = express.Router();

const contactController = require("../controller/contactController");

router.post("/", contactController.createMessage);

router.get("/", contactController.getMessages);

router.get("/:id", contactController.getMessage);
router.put("/read/:id", contactController.markRead);
router.delete("/:id", contactController.deleteMessage);

module.exports = router;