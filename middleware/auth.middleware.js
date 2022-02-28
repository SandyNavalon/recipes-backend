const JwtUtils = require('../utils/jwt/jwtUtils')
const User = require('../models/user.model')
const {setError} = require('../config/errors/error')

//esto es para mantener el usuario logeado hasta que haga logout
const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return next(setError(404, 'Unauthorized'))
        }
        const parsedToken = token.replace('Bearer ', '');
        const validToken = JwtUtils.verify(parsedToken, process.env.JWT_SECRET)
        const userLogged = await User.findById(validToken.id)
        userLogged.password = null
        req.user = userLogged
        next()
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    isAuth
}
