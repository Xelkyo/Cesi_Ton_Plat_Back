const express = require('express')
const router = express.Router()

const {
    userRegister,
    userLogin,
    getUser
} = require('../controllers/userController')

router.post('/register', userRegister)
router.post('/login', userLogin)
router.get('/get', getUser)




// Lancement du serveur
app.listen(port, () => {
    console.log(`Server started on ${port}`)
})


