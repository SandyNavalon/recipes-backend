const jwt = require("jsonwebtoken");

class JwtUtils {
    static generate(id, user) {
        return jwt.sign({ id, user }, process.env.JWT_SECRET, { expiresIn: '1d' });
    }
//va a recibir un token y va a verificar si el token es correcto
    static verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = JwtUtils;
