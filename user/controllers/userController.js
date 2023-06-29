const bcrypt = require('bcrypt')
const User = require('../models/User')
const Restaurant = require('../models/Restaurant')

const userRegister = async (req, res) => {
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;
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
                await User.create({ lastName: lastName, firstName: firstName, email: email, password: password, role: role, address: address, phone: phone, birthday: birthday });
                return res.status(200).send({ msg: 'User created' });
            } catch (err) {
                return res.status(400).send({ msg: err });
            }
        }
    } catch (err) {
        return res.status(500).send({ msg: "Server error" });
    }
}

const userLogin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, role: req.body.role });
        if (user) {
            if (req.body.password == user.password) {
                console.log(user._id)
                return res.status(200).send({ body: user._id });
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
        console.log('Ok')
        return res.status(200).json({ body: users });
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const getUserById = async (req, res) => {
    try {
        const users = await User.find({ $or: [{ role: 'customer' }, { role: 'delivery' }, { role: 'restaurantmanager' }] });
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
                return res.status(200).json({ updatedUser });
            } catch (err) {
                return res.status(400).json({ msg: err });
            }
        } else {
            return res.status(400).json({ msg: 'User does not exist' });
        }
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            try {
                const deletedUser = await User.findByIdAndDelete(req.params.id);
                return res.status(200).json({ deletedUser });
            } catch (err) {
                return res.status(400).json({ msg: err });
            }
        } else {
            return res.status(400).json({ msg: 'User does not exist' });
        }
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

const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) {
            return res.status(200).json(restaurant);
        } else {
            return res.status(400).json({ msg: 'Restaurant does not exist' });
        }
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const getRestaurantsByManagerId = async (req, res) => {
    try {
        console.log('Hey')
        const restaurants = await Restaurant.find({ restaurantManagerId: req.params.id });
        console.log(restaurants)
        if (restaurants) {
            return res.status(200).json(restaurants);
        } else {
            return res.status(400).json({ msg: 'Restaurant does not exist' });
        }
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const createRestaurant = async (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const image = req.body.image;
    const restaurantManagerId = req.body.restaurantmanagerId;
    try {
        const restaurant = await Restaurant.create({ name : name, address : address, phone : phone, email : email, image : image, restaurantManagerId : restaurantManagerId });
        return res.status(200).json(restaurant);
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: err });
    }
}

module.exports = { userRegister, userLogin, getUsers, getRestaurants, getUserById, createUser, updateUser, deleteUser, getRestaurantById, getRestaurantsByManagerId, createRestaurant }