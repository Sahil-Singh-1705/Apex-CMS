const { Router } = require("express");
const checkadmin = require("../middleware/checkAdmin");
const upload = require("../middleware/uploadimage");
const router = Router();
const {showallblogs,getOneBlog,deleteblog,addblog,updateblog, getOneBlogadmin, showallblogs_admin, showallrelatedblogs}= require('../controller/blog');

router.post("/addblog",checkadmin,upload.fields([ { name: "thumbnail_image", maxCount: 1 },{ name: "banner_image", maxCount: 1 },]),addblog);

router.get("/blogs",checkadmin, showallblogs_admin);
router.get("/allblogs",showallblogs);
router.get("/allrelatedblogs",showallrelatedblogs);

router.put("/updateblog/:id", checkadmin, upload.fields([{ name: 'thumbnail_image', maxCount: 1 }, { name: 'banner_image', maxCount: 1 }]), updateblog);

router.get("/getblogs/:id",checkadmin, getOneBlogadmin);
router.get("/getblog/:id", getOneBlog);

router.delete("/deleteblog/:id", checkadmin, deleteblog);

module.exports = router;
