const registry = require('../routes/registry.json')

const deliver1 = (req, res, requestOption) => {
    const nameUrl = registry.services['user'].url
    console.log(nameUrl + req.params.path)
    console.log(requestOption)

    fetch(nameUrl + registry.services['user'].action[req.params.path],
        requestOption)
        .then((data) => {
            console.log(data)
            res.set('Content-Type', 'application/json'); // Définit l'en-tête Content-Type
            res.send({ body: data }); // Envoie la réponse avec le corps spécifié
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send('Internal Server Error')
        })
}

module.exports = { deliver1 } 