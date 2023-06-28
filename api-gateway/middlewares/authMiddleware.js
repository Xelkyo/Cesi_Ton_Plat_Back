const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, category, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token
            let user = await User.findById(decoded.id).select('-password')

            if (!user) {
                res.status(404)
                throw new Error('Not authorized')
            }

            if (category == 1) {
                if (user.role == 'customer') { next() }
                else {
                    res.status(401)
                    throw new Error('Not authorized')
                }
            }

            if (category == 1) {
                if (user.role == 'customer') { next() }
                else {
                    res.status(401)
                    throw new Error('Not authorized')
                }
            }

            if (category == 2) {
                if (user.role == 'restaurantmanager') { next() }
                else {
                    res.status(401)
                    throw new Error('Not authorized')
                }
            }

            if (category == 3) {
                if (user.role == 'deliveryperson') { next() }
                else {
                    res.status(401)
                    throw new Error('Not authorized')
                }
            }

            if (category == 4) {
                if (user.role == 'customer' || 
                user.role == 'restaurantmanager') { next() }
                else {
                    res.status(401)
                    throw new Error('Not authorized')
                }
            }

            if (category == 5) {
                if (user.role == 'customer' || 
                user.role == 'restaurantmanager' ||
                user.role == 'deliveryperson') { next() }
                else {
                    res.status(401)
                    throw new Error('Not authorized')
                }
            }


        } catch {
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})


module.exports = { protect }