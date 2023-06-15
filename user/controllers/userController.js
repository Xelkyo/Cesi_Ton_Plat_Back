const User = require('../models/User')
const bcrypt = require('bcrypt')

const userRegister = async (req, res) => {
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);
    const address = req.body.address;
    const phone = req.body.phone;
    const birthday = req.body.birthday;

    // check if user already exists
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).send({ msg: 'User already exists' })
        } else {
            // create new user
            try {
                await User.create({ lastName : lastName, firstName : firstName, email : email, password : password, address : address, phone : phone, birthday : birthday });
                return res.status(200).send({ msg: 'User created' });
            } catch (err) {
                return res.status(400).send({ msg: err });
            }
        }
    } catch(err) {
        return res.status(500).send({ msg: "Server error" });
    }
}

const userLogin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200).send({ msg: 'User logged in' });
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

module.exports = { userRegister, userLogin }