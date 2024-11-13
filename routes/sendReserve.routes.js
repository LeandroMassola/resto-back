const express = require('express');
const router = express.Router();
const getReviews = require('../controllers/sendReserveController')


router.get('/api/maps', getReviews)
router.post('/sendReserve', sendReserveController.sendSms)
router.get('/confirmReserve/:reservationId', sendReserveController.getReservationById)
router.post('/confirmReserve', sendReserveController.confirmReserve)


module.exports = router