const passport = require('passport');
const User = require('../models/user.model');
const registerStrategy = require('./register.strategy');
// const loginStrategy = require('./login.strategy');


/*
 *
 * Serializer
 * Deserializer
 * passport.use -> registro
 * passport.use -> login
 */


passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const existingUser = await User.findById(userId);
        return done(null, existingUser);
    } catch (error) {
        return done(error);
    }
});

// passport.use('login', loginStrategy);
passport.use('register', registerStrategy);
