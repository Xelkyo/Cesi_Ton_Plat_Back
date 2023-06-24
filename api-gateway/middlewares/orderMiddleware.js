const registry = require('../routes/registry.json')

const deliver4 = (req, res, requestOption) => {
    const nameUrl = registry.services[req.params.apiName].url
    console.log(nameUrl + req.params.path)
    console.log(requestOption)

    fetch(nameUrl + req.params.path, requestOption)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send('Internal Server Error')
        })
}

module.exports = { deliver4 }