const passport = require('passport');
const User = require('../models/user.model');
const registerStrategy = require('./register.strategy');
const loginStrategy = require('./login.strategy');
/**
 * Serializer
 * Deserializer
 * passport.use -> registro
 * passport.use -> login
 */

//asocia id de usuario a una cookie de sesion
passport.serializeUser((user, done) => {
    return done(null, user._id);
});

//el deserializador te coge la cookie y mira qué usuario es el que la tenia colgada
//y te ofrece los datos del usuario que iban asociados a dicha cookie.
passport.deserializeUser(async (userId, done) => {
    try {
        const existingUser = await User.findById(userId);
        return done(null, existingUser);
    } catch (error) {
        return done(error);
    }
});

passport.use("login", loginStrategy);
passport.use("register", registerStrategy);
