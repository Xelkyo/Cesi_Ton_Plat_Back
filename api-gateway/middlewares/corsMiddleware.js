function corsHandler(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Max-Age', '900')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
}

module.exports = corsHandler