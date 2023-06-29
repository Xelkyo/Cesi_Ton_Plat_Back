const registry = require('../routes/registry.json')
const jwt = require('jsonwebtoken')

const { protect } = require('./authMiddleware')
const { deliver } = require('./deliverMiddleware')
const { stat } = require('fs')


const menuHandler = (req, res, requestOption, next) => {
  const user = registry.services['menu']
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

  if ((path == 'menus' || path == 'items') && protect(req, res, 4, token)) {

    const newRequestOption = {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }

    const newUrl = url + req.body.restaurantId
    console.log(newUrl)

    return deliver(req, res, newRequestOption, newUrl, path)
  }

  if ((path == 'menu' || path == 'item') && protect(req, res, 2, token)) {
    return deliver(req, res, requestOption, url, path)
  }

  if ((path == 'menuid' || path == 'itemid') && protect(req, res, 2, token)) {
    //Add Id objet dans url
    return deliver(req, res, requestOption, url, path)
  }

  if (status) {
    return res.send('User is not allowed to access this ressorce')
  }
}



module.exports = { menuHandler } 