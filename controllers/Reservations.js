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

// Reservations: get all reservations of a specific User
const getAllReservations = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).populate({ path: "bookings" });
        res.status(200).json({
            message: "GET all reservations",
            data: user
        })
    }
    catch (err) {
        console.log(err);
    }
}

// Reservations: delete reservation
const deleteReservation = async (req, response) => {
    const reservationId = req.params.id;

    const user_id = req.query.user_id; //get the id of the current user
    setCurrentUser(user_id);

    setTimeout(() => {
        //delete reservation
        currentUser.deleteBooking(reservationId)
            .then((res) => {
                response.status(200).json({msg: 'reservation deleted successfully', data: res})
            })
            .catch((err) => {
            console.log('could not delete reservation', err);
        })
    }, 500)
}

const all ={
    getAllReservations,
    deleteReservation,
}

module.exports = all