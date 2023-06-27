const Order = require('../models/order');

const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(200).json({ order });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json({ order });
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

module.exports = { createOrder, getOrderById, updateOrder };