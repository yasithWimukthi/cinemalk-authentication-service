const express = require("express");
const router = express.Router();
const  bookingsHistory = require("../controllers/Reservations")

// MovieBookings: get bookings history of a specific User
router.get("/:id",bookingsHistory.getAllReservations);

// MovieBookings: delete MovieBooking
router.delete("/:id",bookingsHistory.deleteReservation);

module.exports = router;
