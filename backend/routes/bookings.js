//Routers for Airports
const express = require("express");
const bookingsController = require("../controllers/bookings");
const router = express.Router();

router.post("/insertBookings", bookingsController.insertBookings);

module.exports = router;