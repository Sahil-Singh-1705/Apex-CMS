const { Router } = require("express");
const checkadmin = require("../middleware/checkAdmin");

const router = Router()
const controller=require("../controller/category");

router.get('/get-category',checkadmin, controller.getAllcategories);

router.get("/get-count",checkadmin,controller.getAllcategoriescounts);
router.post("/add-category",checkadmin,controller.addcategory);

router.put("/update-category/:id",checkadmin,controller.updatecategory);

router.delete("/remove-category/:id",checkadmin,controller.deletecategory)

module.exports=router;

