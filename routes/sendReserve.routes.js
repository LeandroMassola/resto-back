const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/apiMapsController')
const sendReserveController = require('../controllers/sendReserveController')


router.get('/api/maps', mapsController.getIdPlace)
router.get('/getReview', mapsController.getReviews)
router.get('/getPlaceId', mapsController.getIdPlace)
router.post('/sendReserve', sendReserveController.sendSms)
router.get('/api/confirmReserve/:reservationId', sendReserveController.getReservationById)
router.post('/confirmReserve', sendReserveController.confirmReserve)


module.exports = router