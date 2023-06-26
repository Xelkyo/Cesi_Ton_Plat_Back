const express = require('express')
const router = express.Router()
const registry = require("./registry.json")
const fs = require('fs')

const { deliver1 } = require('../middlewares/user1Middlerware')
const { deliver2 } = require('../middlewares/user2Middleware')
const { deliver3 } = require('../middlewares/menuMiddleware')
const { deliver4 } = require('../middlewares/orderMiddleware')



router.post('/book', (req, res) => {
    const registrationInfo = req.body

    registrationInfo.url = registrationInfo.host + registrationInfo.port
    registry.services[registrationInfo.apiName] = { ...registrationInfo }
    fs.writeFile('./routes/registry.json', JSON.stringify(registry),
        (error) => {
            if (error) {
                res.send(`Could not register ${registrationInfo.apiName}
                 \n ${error}`)
            } else {
                res.send(JSON.stringify(registrationInfo.apiName
                    + ' succesfully registered'))
            }
        })
})




router.all('/:apiName/:path', (req, res) => {
    console.log('ta race !\n')
    if (req.method != 'OPTIONS') {
        console.log('Tu vas marcher ?')
        if (registry.services[req.params.apiName]
            .action[req.params.path]) {

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
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(req.body)
                }
            }


            if (req.params.path == 'login' ||
                req.params.path == 'register' ||
                req.params.path == 'restaurants') {
                deliver1(req, res, requestOption)
            }

            if (req.params.path == 'user' ||
                req.params.path == 'users' ||
                req.params.path == 'userid') {
                deliver2(req, res, requestOption)
            }

            if (req.params.apiName == 'menu') {
                deliver3(req, res, requestOption)
            }

            if (req.params.apiName == 'order') {
                deliver4(req, res, requestOption)
            }


        } else {
            res.send('API or service doesn\'t exists')
        }
    }
})


module.exports = router