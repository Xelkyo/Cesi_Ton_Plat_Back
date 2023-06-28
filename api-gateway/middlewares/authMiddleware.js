const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = (req, res, category, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //get user from token
            let user = User.findById(decoded.id).select('-password')


            if (!user) {
                return res.status(404).send('Not authorized')
            }

            if (category == 1) {
                if (user.role == 'customer') { return true }
            }

            if (category == 2) {
                if (user.role == 'restaurantmanager') { return true }
            }

            if (category == 3) {
                if (user.role == 'deliveryperson') { return true }
            }

            if (category == 4) {
                if (user.role == 'customer' ||
                    user.role == 'restaurantmanager') { return true }
            }

            if (category == 5) {
                if (user.role == 'customer' ||
                    user.role == 'restaurantmanager' ||
                    user.role == 'deliveryperson') { return true }
            }

            return false

        } catch {
            return res.status(401).send('Not authorized')
        }
    }

    if (!token) {
        return res.status(401).send('Not authorized, no token')
        next()
    }
}


module.exports = { protect }