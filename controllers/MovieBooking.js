const MovieBooking = require("../models/MovieBooking");
const User = require("../models/user");

let currentUser = {}

const setCurrentUser = (user_id) => {
    User.findById(user_id)
        .then((res) => {
            currentUser = res;
        })
        .catch((err) => {
        console.log(err);
        })
}

// Cart: get all saved cart items of a specific User
const getCartDetails = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).populate({ path: "cart.items" });
        res.status(200).json({
            message: "GET cart details",
            cart: user.cart
        })
    }
    catch (err) {
        console.log(err);
    }
}

// Cart: add new MovieBooking to cart
const addMovieBookingToCart = (req, response) => {

    const user_id = req.query.user_id; //get the id of the current user
    setCurrentUser(user_id);
    
    console.log('req', req.body);
    const newMovieBooking = new MovieBooking({
        movieName: req.body.movieName,
        noOfTickets: req.body.noOfTickets,
        movieImg: req.body.movieImg,
        theater: req.body.theater,
        bookingDate: req.body.bookingDate,
        bookedTime: req.body.bookedTime,
    });

    newMovieBooking
        .save()
        .then((result) => {
            response.status(201).json({
                message: "Created",
                newMovieBooking: newMovieBooking,
            });
            //now add this booking to users' Cart
            currentUser.addToCart(newMovieBooking._id)
                .then((res) => {
                console.log('booking added to the cart', res);
                })
                .catch((err) => {
                console.log('booking not added to cart', err);
            })
        })
        .catch((err) => {
            response.status(500).json({
                error: err.message,
            });
        });
}

// Cart: delete MovieBooking from cart
const removeBookingFromCart = async (req, response) => {
    const bookingId = req.params.id;

    const user_id = req.query.user_id; //get the id of the current user
    setCurrentUser(user_id);

    setTimeout(() => {
        //delete MovieBooking
        currentUser.removeFromCart(bookingId)
            .then((res) => {
                response.status(200).json({msg: 'removed successfully', data: res})
            })
            .catch((err) => {
            console.log('booking not removed from cart', err);
        })
    }, 500)
}

// Cart: clear cart
const clearCart = (req, response) => {
    console.log('inside clear cart');
    const user_id = req.query.user_id;
    setCurrentUser(user_id);

    setTimeout(() => {
        //delete entire MovieBooking of this user
        try {
            currentUser.clearCart()
            .then((res) => {
                response.status(200).json({msg: 'cart cleared', data: res})
            })
            .catch((err) => {
            console.log('cart was not cleared', err);
        })
        }
        catch (err) {
            console.log(err);
        }
    }, 500)
}


const all ={
    addMovieBookingToCart,
    getCartDetails,
    removeBookingFromCart,
    clearCart
}

module.exports = all