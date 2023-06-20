const User = require('../models/User')
const Restaurant = require('../models/Restaurant')

const userRegister = async (req, res) => {
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);
    const address = req.body.address;
    const phone = req.body.phone;
    const birthday = req.body.birthday;
    const role = req.body.role;

    // check if user already exists
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).send({ msg: 'User already exists' })
        } else {
            // create new user
            try {
                await User.create({ lastName : lastName, firstName : firstName, email : email, password : password, role : role, address : address, phone : phone, birthday : birthday });
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
                return res.status(200).send({ msg: 'User logged in' });
            } else {
                return res.status(400).send({ msg: 'Wrong password' });
            }
        } else {
            return res.status(400).send({ msg: 'User does not exist' });
        }
    } catch (err) {
        console.log('Error here!')
        return res.status(500).send({ msg: 'Server error' });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users });
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        console.log(restaurants)
        return res.status(200).json(restaurants);
        
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

module.exports = { userRegister, userLogin, getUsers, getRestaurants }