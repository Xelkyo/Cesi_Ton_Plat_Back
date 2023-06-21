const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menuController')

router.get('menus', menuController.getMenus)
router.get('menu/:id', menuController.getMenuById)
router.post('menu', menuController.createMenu)
router.put('menu/:id', menuController.updateMenu)
router.delete('menu/:id', menuController.deleteMenu)

router.get('items', menuController.getItems)
router.get('item/:id', menuController.getItemById)
router.post('item', menuController.createItem)
router.put('item/:id', menuController.updateItem)

module.exports = router