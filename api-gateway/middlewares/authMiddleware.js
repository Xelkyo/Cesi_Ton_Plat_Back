const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res, category, token) => {


    if (!token) {
        return res.status(401).send('Not authorized, no token')
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('\n Decoded : \n')
        console.log(decoded)
        console.log(decoded.id)
        //get user from token
        const user = await User.findOne({_id: decoded.id})
        console.log('\n User : \n')
        console.log(user)


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


module.exports = { protect }