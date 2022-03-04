const passport = require('passport');
const User = require('../models/user.model');

const registerStrategy = require('./register.strategy');
const loginStrategy = require('./login.strategy');

//setCookie
passport.serializeUser((user, done) => {
    return done(null, user._id);//_id: modelo de mongoose
});

passport.deserializeUser(async (userId, done) => {
    try {
        const existingUser = await User.findById(userId);
        return done(null, existingUser);
    } catch (error) {
        return done(error);
    }
});

passport.use('login', loginStrategy);
passport.use('register', registerStrategy);
