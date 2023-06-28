const registry = require('../routes/registry.json')
const jwt = require('jsonwebtoken')

const { protect } = require('./authMiddleware')
const { deliver } = require('./deliverMiddleware')


const userHandler = (req, res, requestOption, next) => {
  const user = registry.services['user']
  const url = user.url + user.action[req.params.path]
  const path = req.params.path
  console.log(url)
  console.log(requestOption)

  if (path == 'login' || path == 'register') {
    return deliver(req, res, requestOption, url, path)
  }

  if (path == 'restaurants' && protect(req, res, 1, next)) {
    return deliver(req, res, requestOption, url, path)
  }

  if (path == 'restaurant' && protect(req, res, 2, next)) {
    //get token from header
    token = req.headers.authorization.split(' ')[1]
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    url += decoded.id
    console.log(url)

    return deliver(req, res, requestOption, url, path)
  }

  if (protect(req, res, 5, next)) {
    return deliver(req, res, requestOption, url, path)
  }

  res.send('User not allowed to access this ressorce')

}



module.exports = { userHandler } 