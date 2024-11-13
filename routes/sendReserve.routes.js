const express = require('express');
const router = express.Router();
const sendReserveController = require('../controllers/sendReserveController')

router.post('/sendReserve', sendReserveController.sendSms)
router.get('/confirmReserve/:reservationId', sendReserveController.getReservationById)
router.post('/confirmReserve', sendReserveController.confirmReserve)


module.exports = router