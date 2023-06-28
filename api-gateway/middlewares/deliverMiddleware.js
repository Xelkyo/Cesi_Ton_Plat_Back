const jwt = require('jsonwebtoken')

const deliver = (req, res, requestOption, url, path) => {
    console.log('chantilly')
    fetch(url, requestOption)
        .then((response) => {
            console.log('fraise')
            if (response.ok) {
                console.log('ananas')
                return response.json()
            } else {
                throw new Error('Erreur lors de la requête fetch')
            }
        })
        .then((data) => {
            console.log(data)
            if (path == 'login') {
                const token = generateToken(data.body)
                console.log(token)
                res.cookie('token', token, {
                    domain: 'localhost:5173',
                    sameSite: 'Lax',
                    maxAge: 3600000 //durée de vie des tokens en millisecondes : 1h
                })
                return res.send({ body: 'ok' })
            } else {
                return res.send({ body: data })
            }
        })
        .catch((error) => {
            console.error(error)
            return res.status(500).send('Internal Server Error')
        })
}

// Génération des JWT
const generateToken = (id) => {
    console.log('fruit du dragon')
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}

module.exports = { deliver }
