const registry = require('../routes/registry.json')

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
            console.log(data)
            res.send({body: data})
          })
        .catch((error) => {
            console.error(error)
            res.status(500).send('Internal Server Error')
        })
}

module.exports = { deliver1 } 