
const { Router } = require("express");

const router = Router()

const controller=require("../controller/tradeandearn");
router.post('/post',controller.addTradeAndEarn);

module.exports=router;
