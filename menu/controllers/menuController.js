const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');

// Menu CRUD

const createMenu = async (req, res) => {
    try {
        const menu = await Menu.create(req.body);
        await Restaurant.findByIdAndUpdate(req.params.id, { $push: { menus: menu._id }});
        return res.status(200).json({ menu });
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const updateMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (menu) {
            try {
                const updateMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
                await Restaurant.findByIdAndUpdate(req.params.id, { $push: { menus: menu._id }});
                return res.status(200).json({ updateMenu });
            } catch (err) {
                return res.status(400).json({ msg: err });
            }
        } else {
            return res.status(400).json({ msg: 'Menu does not exist' });
        }
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        return res.status(200).json({ menu });
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        return res.status(200).json({ menu });
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find({restaurantId: req.params.idmanag});
        if(menus) {
            return res.status(200).json({ menus });
        } else{
            return res.status(200).json([]);
        }
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (menu) {
            try {
                await Menu.findByIdAndDelete(req.params.id);
                return res.status(200).json({ msg: 'Menu deleted' });
            } catch (err) {
                return res.status(400).json({ msg: err });
            }
        } else {
            return res.status(400).json({ msg: 'Menu does not exist' });
        }
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

// Item CRUD

const createItem = async (req, res) => {
    try {
        const item = await MenuItem.create(req.body);
        return res.status(200).json({ item });
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const getItemById = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        return res.status(200).json({ item });
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const updateItem = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (item) {
            try {
                await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
                return res.status(200).json({ msg: 'Item updated' });
            } catch (err) {
                return res.status(400).json({ msg: err });
            }
        } else {
            return res.status(400).json({ msg: 'Item does not exist' });
        }
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const getItems = async (req, res) => {
    try {
        const items = await MenuItem.find({restaurantId: req.params.idmanag});
        if(items) {
            return res.status(200).json({ items });
        } else{
            return res.status(200).json([]);
        }
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

const addMenuItem = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        const menuItem = await MenuItem.create(req.body);
        menu.menuItems.push(menuItem);
        await menu.save();
        return res.status(200).json({ menu });
    } catch (err) {
        return res.status(400).json({ msg: err });
    }
}

module.exports = { createMenu, getMenu, getMenuById, getMenus, addMenuItem, getItemById, createItem, updateItem, getItems, updateMenu, deleteMenu }