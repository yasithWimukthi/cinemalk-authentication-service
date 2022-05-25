const mongoose = require('mongoose');
const MovieBooking = require('./MovieBooking');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    type: {
        type: String,
    },
    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    cart: {
        items: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MovieBooking',
                required: true
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0
        }
    }
});

userSchema.methods.addToCart = async function (bookingId) {
    try {
        //find the booking which is to be added into the cart
        const booking = await MovieBooking.findById(bookingId);
        console.log('booking', booking);

        //add this booking to the cart
        let cart = this.cart;
        cart.items.push(booking);
        const bookingPrice = booking.ticketPrice * booking.noOfTickets;
        cart.totalPrice += bookingPrice;
        console.log('cart', cart, 'price', cart.totalPrice);

        //save the item in DB
        this.save();
    } catch (error) {
        console.log(error);
    }
};

userSchema.methods.removeFromCart = async function (bookingId) {
    try {
        //find the booking which is to be removed from the cart
        let cart = this.cart;
        const bookingIndex = cart.items.findIndex(item => new String(item._id).trim() === new String(bookingId).trim());
        console.log('index', bookingIndex);
        if (bookingIndex != -1) {
            //find the booking which is to be added into the cart
            const booking = await MovieBooking.findById(bookingId);
            //re-calculate the cart total
            cart.totalPrice = cart.totalPrice - (booking.ticketPrice * booking.noOfTickets);
            //remove booking from cart
            cart.items.splice(bookingIndex, 1);
            await this.save();
        }       
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = mongoose.model('User', userSchema);