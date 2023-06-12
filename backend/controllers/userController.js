const User = require('../models/userModel')
const jwtModule = require('../../authentification/modules/jwt')
const jwt = require('jsonwebtoken')

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const userRegister = async (req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = eq.body.password;
    const role = req.body.role;
    const address = req.body.address;
    const phone = req.body.phone;

    // check if user already exists
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            console.log('User already exists HAHAHA');
            return res.status(400).send({ msg: 'User already exists' })
        } else {
            // create new user
            try {
                await User.create({ fullname : fullname, email : email, password : password, role : role, address : address, phone : phone });
                console.log('User created HAHAHA');
                res.render("customerLogin");
            } catch (err) {
                console.log('Error while creating user HAHAHA');
                return res.status(400).send({ msg: err });
            }
        }
    } catch(err) {
        console.log('Error while checking if user exists HAHAHA');
        return res.status(500).send({ msg: "Server error" });
    }
}

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const userLogin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            if (req.body.password == user.password) {
                //const token = await jwtModule.createJwtToken({ user });
                //res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.status(200).send({ msg: 'User logged in' });
                //res.status(200).send({ msg: 'User logged in', user: user, token: token });
            } else {
                res.status(400).send({ msg: 'Wrong password' });
            }
        } else {
            res.status(400).send({ msg: 'User does not exist' });
        }
    } catch (err) {
        console.log('Error here!')
        res.status(500).send({ msg: 'Server error' });
    }
}

const authentificate = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
    
    const decoded = await jwtModule.verifyJwtToken(token)
    if (!decoded) return res.sendStatus(403)

    req.user = await User.findOne({ email: decoded.payload.email })
    next()
}

// @desc    Get user data
// @route   GET /api/users/ME
// @access  Public
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
        res.json(user)
    } catch (err) {
        console.log('Error here!')
        res.status(500).send({ msg: 'Server error' });
    }
}

module.exports = { userRegister, userLogin, getUser };