const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/apiMapsController')


router.get('/api/maps', mapsController.getReviews)
router.post('/sendReserve', sendReserveController.sendSms)
router.get('/confirmReserve/:reservationId', sendReserveController.getReservationById)
router.post('/confirmReserve', sendReserveController.confirmReserve)


module.exports = router