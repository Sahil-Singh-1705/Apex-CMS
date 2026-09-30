const { Router } = require("express");
const {
  getAllPages,
  createPage,
  editPage,
  changePublishedStatus,
} = require("../controller/page");
const checkadmin = require("../middleware/checkAdmin");
const router = Router();

router.get("/pages/all",checkadmin, getAllPages);

router.post("/pages/create",checkadmin, createPage);

router.put("/pages/update/:id",checkadmin, editPage);

router.put("/pages/changestatus/:id",checkadmin, changePublishedStatus);

module.exports = router;
