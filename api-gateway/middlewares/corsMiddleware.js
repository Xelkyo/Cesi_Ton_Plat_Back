function corsHandler(req, res, next) {
    console.log('banane ')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Max-Age', '900') // Durée de mise en cache des options CORS, en secondes
    next()
  }
  
  function optionsHandler(req, res) {
    console.log('flambée !')
    // Envoyer une réponse vide avec le code de statut 200
    res.sendStatus(200)
  }
  
  module.exports = [corsHandler, optionsHandler]