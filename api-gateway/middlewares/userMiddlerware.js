const registry = require('../routes/registry.json')
const jwt = require('jsonwebtoken')

const { protect } = require('./authMiddleware')
const { deliver } = require('./deliverMiddleware')


const userHandler = async (req, res, requestOption, next) => {
  const user = registry.services['user']
  const url = user.url + user.action[req.params.path]
  const path = req.params.path
  const token = req.body.token
  console.log(token)
  console.log(url)
  console.log(requestOption)

  if (path == 'login' || path == 'register') {
    return deliver(req, res, requestOption, url, path)
  }

  if (path == 'restaurants' && await protect(req, res, 1, token)) {

    const newRequestOption = {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }

    return deliver(req, res, newRequestOption, url, path)
  }

  if (path == 'restaurant' && await protect(req, res, 2, token)) {
    return deliver(req, res, newRequestOption, url, path)
  }

  if (path == 'restaurantmanagid' && await protect(req, res, 2, token)) {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const newUrl = url + decoded.id
    console.log(newUrl)

    const newRequestOption = {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }

    return deliver(req, res, newRequestOption, newUrl, path)
  }

  if (path == 'restaurantid' && await protect(req, res, 4, token)) {

    const newRequestOption = {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }

    return deliver(req, res, newRequestOption, url, path)
  }

  if (await protect(req, res, 5, token)) {
    return deliver(req, res, requestOption, url, path)
  }

  return res.send('User not allowed to access this ressorce')

}



module.exports = { userHandler } 