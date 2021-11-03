const jwt = require('jsonwebtoken')
const config = require("../config");
const secret=config.SECRET
const time=config.TIEMPO

const generateToken=(user)=> {
    return jwt.sign({ data: user }, secret, { expiresIn: time })
}
const checkToken=(req, res, next)=> {
    let token = req.headers.authorization || req.cookies.auth
    if (!token) {
        console.log('debe proveer el token')
        return res.status(403).redirect('/auth/login')
    }
    jwt.verify(token, secret, (err, value) => {
        if (err) return res.status(500).send('fallo la autenticacion con token');
        req.user = value;
        next();
    });
}

module.exports = {generateToken,checkToken}
