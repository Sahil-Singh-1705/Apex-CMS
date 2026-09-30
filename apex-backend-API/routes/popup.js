const { Router } = require("express");
const checkadmin = require("../middleware/checkAdmin");
const router = Router();
const {
    getAllPopup,
    addPopup,
    updatePopup,
    deletePopup,
    getSinglePopup,
    getallpublishedPopup,
  } = require("../controller/popup");
router.get("/all",checkadmin,getAllPopup);
router.post("/add",checkadmin,addPopup);
router.put("/update/:id",checkadmin,updatePopup);
router.delete("/delete/:id",checkadmin,deletePopup);
router.get("/single/:id",checkadmin,getSinglePopup);
router.get("/allpublished",getallpublishedPopup);

module.exports = router;