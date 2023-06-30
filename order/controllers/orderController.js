const Order = require('../models/Order');

const createOrder = async (req, res) => {
    try {
        await Order.create(req.body);
        return res.status(200).json('ok');
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: err });
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await Order.find({
            restaurantId: req.params.id,
            status: ('pending' || 'preparing' || 'ready')
        });
        if (order) { return res.status(200).send(order); }
        else { return res.status(200).json([]); }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            try {
                const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.status(200).json({ updateOrder });
            } catch (err) {
                res.status(400).json({ msg: err });
            }
        } else {
            res.status(400).json({ msg: 'Order does not exist' });
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

// get orders of logged user
const getOrdersByUser = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.id });
        res.status(200).json({ orders });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

module.exports = { createOrder, getOrderById, updateOrder, getOrdersByUser, getOrders };