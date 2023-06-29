const jwt = require('jsonwebtoken')

const deliver = async (req, res, requestOption, url, path) => {
    await fetch(url, requestOption)
        .then( async (response) => {
            if (response.ok) {
                return await response.json()
            } else {
                throw new Error('Erreur lors de la requête fetch')
            }
        })
        .then( async (data) => {
            console.log(data)
            if (path == 'login') {
                const token = generateToken(data.body)
                console.log(token)
                // res.cookie('token', token, {
                //     domain: 'localhost:5173/logIn',
                //     sameSite: 'Lax',
                //     maxAge: 3600000 //durée de vie des tokens en millisecondes : 1h
                // })
                return await res.send({token});
                //return res.send({ body: 'ok' })
             } else {
                 return await res.send({ body: data })
             }
        })
        .catch( async (error) => {
            console.error(error)
            return await res.status(500).send('Internal Server Error')
        })
}

// Génération des JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}

module.exports = { deliver }
