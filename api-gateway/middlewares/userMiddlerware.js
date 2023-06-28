const registry = require('../routes/registry.json')
const jwt = require('jsonwebtoken')


const deliver1 = (req, res, requestOption) => {
  const nameUrl = registry.services['user'].url
  console.log(nameUrl + registry.services['user'].action[req.params.path])
  console.log(requestOption)

  fetch(nameUrl + registry.services['user'].action[req.params.path],
    requestOption)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Erreur lors de la requête fetch')
      }
    })
    .then((data) => {
      console.log(data.body)
      if (req.params.path == 'login') {
        const token = generateToken(data.body)
        console.log(token)
        res.cookie('token', token, {
          domain: 'localhost:5173',
          sameSite: 'Lax',
          maxAge: 3600000
        })
        return res.send({ body: 'ok' })
      }
      res.send({ body: data })
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('Internal Server Error')
    })
}

// Generation des JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

module.exports = { deliver1 } 