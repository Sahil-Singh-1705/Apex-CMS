

const { Router } = require("express");
const checkadmin = require("../middleware/checkAdmin");

const router = Router()

const controller=require("../controller/queries");
router.post('/post',controller.addQueries);
router.get('/get',checkadmin,controller.getQueries);
router.delete('/delete/:id',checkadmin,controller.deleteQueries);

module.exports=router;
