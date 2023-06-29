const registry = require('../routes/registry.json')
const jwt = require('jsonwebtoken')

const { protect } = require('./authMiddleware')
const { deliver } = require('./deliverMiddleware')


const menuHandler = (req, res, requestOption, next) => {
  const user = registry.services['menu']
  const url = user.url + user.action[req.params.path]
  const path = req.params.path
  const token = req.params.token
  console.log(url)
  console.log(requestOption)

  if ((path == 'menus' || path == 'items') && protect(req, res, 4, next)) {

    const newRequestOption = {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }

    const newUrl = url + req.body.restaurantId
    console.log(newUrl)

    return deliver(req, res, newRequestOption, newUrl, path)
  }

  if ((path == 'menu' || path == 'item') && protect(req, res, 2, next)) {
    return deliver(req, res, requestOption, url, path)
  }

  if ((path == 'menuid' || path == 'itemid') && protect(req, res, 2, next)) {
    //Add Id objet dans url
    return deliver(req, res, requestOption, url, path)
  }

  res.send('User is not allowed to access this ressorce')

}



module.exports = { menuHandler } 