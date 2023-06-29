const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { decode } = require('punycode')

const protect = async (req, res, category, token) => {


    if (!token) {
        console.log('No token')
        return false
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //console.log('\n Decoded : \n')
        //console.log(decoded)

        if (!decoded) { console.log('Pas token') }
        else { 'Ok token' }

        console.log('id :' + decoded.id)
        //get user from token
        const user = await User.findOne({ _id: decoded.id })
        //console.log('\n User : \n')
        //console.log(user)


        if (!user) {
            console.log('No user')
            return false
        }

        if (category == 1) {
            console.log(category)
            if (user.role == 'customer') {
                console.log('yes')
                return true
            }
        }

        if (category == 2) {
            console.log(category)
            if (user.role == 'restaurantmanager') {
                console.log('yes')
                return true
            }
        }

        if (category == 3) {
            console.log(category)
            if (user.role == 'deliveryperson') {
                console.log('yes')
                return true
            }
        }

        if (category == 4) {
            console.log(category)
            if (user.role == 'customer' ||
                user.role == 'restaurantmanager') {
                    console.log('yes')
                return true
            }
        }

        if (category == 5) {
            console.log(category)
            if (user.role == 'customer' ||
                user.role == 'restaurantmanager' ||
                user.role == 'deliveryperson') {
                    console.log('yes')
                return true
            }
        }

        return false

    } catch (err) {
        console.log('authMiddleware.js')
        console.log(err)
        return res.status(401).send('Not authorized')
    }
}


module.exports = { protect }