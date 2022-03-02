const passport = require ('passport');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;

const registerStrategy = new LocalStrategy(
    {
        usernameField:'email',
        passwordField:'password',
        passReqToCallback: true,

    },
    async (req, email, password, done) => {

        const existingUser = await User.findOne({email: email});
        try{
            if(existingUser) {
                const error = new Error('The user is already registered');
                return done(error);
            }

            const saltRound = 10;
            const hash = await bcrypt.hash(password, saltRound);

            const newUser = new User ({
                email: email,
                password: hash,
                user: req.body.user,
            })

            const savedUser = await newUser.save();
            return done(null, savedUser);

        }catch(error) {
            done(error, null)
        }
    }
);

module.exports = registerStrategy;