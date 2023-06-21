const express = require('express')
const router = express.Router()
const registry = require("./registry.json")

const { deliver } = require('../middlewares/userMiddlerware')


router.all('/:apiName/:path', (req, res) => {
    console.log('ta race !\n')
    if (req.method != 'OPTIONS') {
        console.log('Tu vas marcher ?')
        if (registry.services[req.params.apiName]
            .action.includes(req.params.path)) {

            let requestOption
            console.table(req.headers)
            console.log(req.method)

            if (req.method == 'GET' || req.method == 'DELETE') {
                requestOption = {
                    method: req.method,
                    headers: req.headers
                }
            } else {
                requestOption = {
                    method: req.method,
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(req.body)
                }
            }


            if (req.params.apiName == 'user') {
                deliver(req, res, requestOption)
            }


        } else {
            res.send('API or service doesn\'t exists')
        }
    }
})

module.exports = router