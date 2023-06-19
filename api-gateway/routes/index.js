const express = require('express')
const router = express.Router()
const registry = require("./registry.json")

const user = require('../middlewares/userMiddlerware')


router.all('/:apiName/:path', (req, res) => {
    console.log(req.params.apiName)

    if (registry.services[req.params.apiName, req.params.path]) {

        let requestOption

        if (req.method == 'GET' || req.method == 'DELETE') {
            requestOption = {
                method: req.method,
                headers: req.headers
            }
        } else {
            requestOption = {
                method: req.method,
                headers: req.headers,
                body: req.body
            }
        }


        if (req.params.apiName == 'user'){
            router.use('/', (req, res, next) => {
                user.deliver(req, res, next, requestOption)
            })
        }


    } else {
        res.send('API or service doesn\'t exists')
    }
})

module.exports = router