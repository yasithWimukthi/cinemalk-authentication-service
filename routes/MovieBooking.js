const express = require("express");
const router = express.Router();
const  MovieBooking = require("../controllers/MovieBooking")

// MovieBookings: view all MovieBookings
router.get("/", MovieBooking.viewAll);

// MovieBookings: get detais of a specific User
router.get("/:id",MovieBooking.getCartDetails);

// MovieBookings: add new MovieBooking
router.post("/", MovieBooking.addMovieBookingToCart);

// MovieBookings: delete MovieBooking
router.delete("/:id",MovieBooking.removeBookingFromCart);


module.exports = router;
