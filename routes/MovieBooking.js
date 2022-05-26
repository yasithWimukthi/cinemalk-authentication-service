const express = require("express");
const router = express.Router();
const  MovieBooking = require("../controllers/MovieBooking")

// MovieBookings: get detais of a specific User
router.get("/:id",MovieBooking.getCartDetails);

// MovieBookings: add new MovieBooking
router.post("/", MovieBooking.addMovieBookingToCart);

// MovieBookings: delete MovieBooking
router.delete("/:id",MovieBooking.removeBookingFromCart);

// MovieBookings: delete the whole cart
router.delete("/clear-cart/:id",MovieBooking.clearCart);

module.exports = router;
