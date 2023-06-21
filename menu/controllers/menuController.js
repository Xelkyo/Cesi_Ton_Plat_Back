const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');

// Menu CRUD

const createMenu = async (req, res) => {
    try {
        const menu = await Menu.create(req.body);
        await Restaurant.findByIdAndUpdate(req.params.id, { $push: { menus: menu._id }});
        res.status(200).json({ menu });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const updateMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (menu) {
            try {
                const updateMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
                await Restaurant.findByIdAndUpdate(req.params.id, { $push: { menus: menu._id }});
                res.status(200).json({ updateMenu });
            } catch (err) {
                res.status(400).json({ msg: err });
            }
        } else {
            res.status(400).json({ msg: 'Menu does not exist' });
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json({ menu });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        res.status(200).json({ menu });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.status(200).json({ menus });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (menu) {
            try {
                await Menu.findByIdAndDelete(req.params.id);
                res.status(200).json({ msg: 'Menu deleted' });
            } catch (err) {
                res.status(400).json({ msg: err });
            }
        } else {
            res.status(400).json({ msg: 'Menu does not exist' });
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

// Item CRUD

const createItem = async (req, res) => {
    try {
        const item = await MenuItem.create(req.body);
        res.status(200).json({ item });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const getItemById = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        res.status(200).json({ item });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const updateItem = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (item) {
            try {
                await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.status(200).json({ msg: 'Item updated' });
            } catch (err) {
                res.status(400).json({ msg: err });
            }
        } else {
            res.status(400).json({ msg: 'Item does not exist' });
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const getItems = async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.status(200).json({ items });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

const addMenuItem = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        const menuItem = await MenuItem.create(req.body);
        menu.menuItems.push(menuItem);
        await menu.save();
        res.status(200).json({ menu });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
}

module.exports = { createMenu, getMenu, getMenuById, getMenus, addMenuItem, getItemById, createItem, updateItem, getItems, updateMenu, deleteMenu }