const registry = require('../routes/registry.json')
const jwt = require('jsonwebtoken')

const { protect } = require('./authMiddleware')
const { deliver } = require('./deliverMiddleware')


const userHandler = async (req, res, requestOption, next) => {
  const user = registry.services['user']
  const url = user.url + user.action[req.params.path]
  const path = req.params.path
  console.log(url)
  let token
  let state = true
  //console.log(requestOption)
  try {
    token = req.headers['authorization'].split(' ')[1]
    console.log(token)
  }
  catch {
    if (path == 'login' || path == 'register') {
      return deliver(req, res, requestOption, url, path)
    } else {
      state = false
      return res.send('No token sent')
    }
  }

  if (path == 'restaurants' && await protect(req, res, 1, token)) {
    return deliver(req, res, requestOption, url, path)
  }

  if (path == 'restaurant' && await protect(req, res, 2, token)) {
    return deliver(req, res, requestOption, url, path)
  }

  if (path == 'restaurantmanagid' && await protect(req, res, 2, token)) {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const newUrl = url + decoded.id
    console.log(newUrl)

    return deliver(req, res, requestOption, newUrl, path)
  }

  if (path == 'restaurantid' && await protect(req, res, 4, token)) {
    const newRequestOption = {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }

    return deliver(req, res, newRequestOption, url, path)
  }

  if (path == 'userid' && await protect(req, res, 5, token)) {
    console.log('6')
    //Add id user dans url
    return deliver(req, res, requestOption, url, path)
  }

  if (state) {
    console.log('userMiddleware.js')
    return res.send('User not allowed to access this ressorce')
  }

}



module.exports = { userHandler } 