const { Router } = require("express");
const {
  getAllPages,
  createPage,
  editPage,
  changePublishedStatus,
  getSinglePage,
  getPageEditorData,
  getSinglePageByEndpoint,
  deletePage,
  getpagedata,
  getAllEndpoints,
} = require("../controller/page");
const {
  getAllMenus,
  getAllMenusName,
  addMenus,
  editMenus, 
  addMenuName,
} = require("../controller/menu");
const upload = require('../middleware/uploadimage'); 

const checkadmin = require("../middleware/checkAdmin");
const { changepassword, adminLogin, createAdmin ,upload_image} = require("../controller/admin");
const router = Router();

router.post("/login",adminLogin);

router.post("/signup",createAdmin);

router.get("/pages/all",checkadmin,getAllPages);

router.get("/pages/endpoint", getSinglePageByEndpoint);

router.post("/pages/create",checkadmin, createPage);

router.put("/pages/update/:id",checkadmin, editPage);

router.delete("/pages/delete/:id",checkadmin, deletePage);

router.put("/pages/changestatus/:id",checkadmin, changePublishedStatus);

router.get("/pages/:id",checkadmin, getSinglePage);

router.get("/pages/editor/:id",checkadmin, getPageEditorData);

router.get("/pages/end",getpagedata);

router.get("/menunames/all",checkadmin, getAllMenusName);

router.get("/menus/all/:id",getAllMenus);

router.get("/menunames/add",checkadmin, addMenuName);

router.post("/menus/add",checkadmin, addMenus);

router.post("/menus/edit/:id",checkadmin, editMenus);

router.post("/changepassword",checkadmin,changepassword);
router.post("/image/upload",upload.single('image'),upload_image);
router.get("/getallendpoint",getAllEndpoints)

module.exports = router;

