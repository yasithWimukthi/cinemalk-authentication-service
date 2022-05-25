const mongoose = require('mongoose');

const MovieBookingSchema = mongoose.Schema({
            movieName: {
                type: String,
                required: true
            },
            movieImg: {
                type: String,
                required: true
            },
            theater: {
                type: String,
                required: true
            },
            bookingDate: {
                type: String,
                required: true
            },
            bookedTime: {
                type: String,
                required: true
            },
            noOfTickets: {
                type: Number,
                required: true
            },
            ticketPrice: {
                type: Number,
                default: 500,
                required: false
            }
}, { timestamps: true });

module.exports =  mongoose.model('MovieBooking', MovieBookingSchema);

