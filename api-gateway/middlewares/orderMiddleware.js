const registry = require('../routes/registry.json')
const User = require('../models/userModel')
const Resto = require('../models/restaurantModel')

const { protect } = require('./authMiddleware')
const { deliver } = require('./deliverMiddleware')


const orderHandler = async (req, res, requestOption) => {
    const user = registry.services['order']
    const url = user.url + user.action[req.params.path]
    const path = req.params.path
    let token
    let status = true
    console.log(url)
    console.log(requestOption)

    try {
        token = req.headers['authorization'].split(' ')[1]
        console.log(token)
    } catch {
        console.log('No token sent')
        status = false
        return res.send('No token sent')
    }


    if (path == 'orderuser' && await protect(req, res, 5, token)) {

        // FAIRE DISTINCTION ENTRE UTILISATEURS 
        const newRequestOption = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        const newUrl = url + req.body.restaurantId
        console.log(newUrl)

        return deliver(req, res, newRequestOption, newUrl, path)
    }

    if (path == 'order' && await protect(req, res, 1, token)) {
        console.log(requestOption.body)
        const bodyObj = JSON.parse(requestOption.body)
        const restId = bodyObj.restaurantId
        const userId = bodyObj.customerId

        const resto = await Resto.findOne({ _id: restId })
        const user = await User.findOne({ _id: userId })

        console.log(resto)
        console.log(user)
        console.log(bodyObj.order_items)

        const newRequestOption = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                restaurantId: restId,
                restaurantName: resto.name,
                customerId: userId,
                customerName: user.firstName + ' ' + user.lastName,
                customerNumber: user.phone,
                items: JSON.stringify(bodyObj.order_items),
                deliveryAddress: user.address,
                pickupAddress: resto.address,
                totalPrice: bodyObj.price
            })
        }

        return deliver(req, res, newRequestOption, url, path)
    }

    if (path == 'orderid' && await protect(req, res, 5, token)) {
        const newRequestOption = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        
        const newUrl = url + JSON.parse(requestOption.body).restaurantId
        console.log(newUrl)

        return deliver(req, res, newRequestOption, newUrl, path)
    }

    if (status) {
        return res.send('User is not allowed to access this ressorce')
    }
}

module.exports = { orderHandler }