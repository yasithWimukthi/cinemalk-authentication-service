const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const {signup, login} = require("../controllers/auth");

const router = express.Router();

router.post(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-Mail address already exists!');
                    }
                });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 }),
        body('firstName')
            .trim()
            .not()
            .isEmpty(),
        body('lastName')
            .trim()
            .not()
            .isEmpty(),
        body('mobile')
            .trim(),
        body('type')
            .trim()
            .not()
            .isEmpty()
    ],
    signup
);

router.post('/login', login);

module.exports = router;