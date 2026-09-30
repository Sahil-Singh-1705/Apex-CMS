const {Router} = require("express");
const  router = Router();

const controller = require("../controller/ticket");

router.post('/post',controller.createTicket)
router.get('/get',controller.getAllTickets)
router.put('/:id',controller.updateStatus)
module.exports= router;