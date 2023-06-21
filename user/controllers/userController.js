const bcrypt = require('bcrypt')
const User = require('../models/User')
const Restaurant = require('../models/Restaurant')
const jwtModule = require('../jwtModule')

const userRegister = async (req, res) => {
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);
    const address = req.body.address;
    const phone = req.body.phone;
    const birthday = req.body.birthday;
    const role = req.body.role;

    console.log('userRegister')

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
                //const token = jwtModule.createJwtToken(user);
                //res.status(200).send({ msg: 'User logged in' });
                if (user.role == 'customer') {
                    return res.redirect('/customer');
                } else if (user.role == 'restaurantmanager') {
                    console.log('You are here!')
                    return res.redirect('/restaurant');
                } else if (user.role == 'delivery') {
                    return res.redirect('/delivery');
                } else if (user.role == 'salesperson') {
                    return res.redirect('/sales');
                } else {
                    return res.status(400).send({ msg: 'Erro: User created without role' });
                }
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

const getUsers = async (req, res) => {
    try {
        //const users = await User.find();
        // find all users of type customer, delivery and restaurantmanager
        const users = await User.find({ $or: [ { role: 'customer' }, { role: 'delivery' }, { role: 'restaurantmanager' } ] });
        res.status(200).json({ users });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.status(200).json({ updatedUser });
            } catch (err) {
                res.status(400).json({ msg: err });
            }
        } else {
            res.status(400).json({ msg: 'User does not exist' });
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            try {
                const deletedUser = await User.findByIdAndDelete(req.params.id);
                res.status(200).json({ deletedUser });
            } catch (err) {
                res.status(400).json({ msg: err });
            }
        } else {
            res.status(400).json({ msg: 'User does not exist' });
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json({ restaurants });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

module.exports = { userRegister, userLogin, getUsers, getRestaurants, getUserById, createUser, updateUser, deleteUser }