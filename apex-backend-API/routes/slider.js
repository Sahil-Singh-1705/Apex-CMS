const { Router } = require("express");
const checkadmin = require("../middleware/checkAdmin");
const router = Router();
const {
    getAllSlider,
    addSlider,
    updateSlider,
    deleteSlider,
    getSingleSlider,
    getallpublishedSlider,
  } = require("../controller/slider");
router.get("/all",checkadmin,getAllSlider);
router.post("/add",checkadmin,addSlider);
router.put("/update/:id",checkadmin,updateSlider);
router.delete("/delete/:id",checkadmin,deleteSlider);
router.get("/single/:id",checkadmin,getSingleSlider);
router.get("/allpublished",getallpublishedSlider);

module.exports = router;