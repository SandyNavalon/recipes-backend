const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/register', (req, res, next) => {
    // Invocamos a la autenticación de Passport
    passport.authenticate('register', (error, user) => {
        // Si hay un error, llamamos a nuestro controlador de errores
        if (error) {
            return next(error);
        }

        // Si no hay error, devolvemos el user registrado
        return res.status(201).json(user)
    })(req); // ¡No te olvides de invocarlo aquí!
});

module.exports = router;