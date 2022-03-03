const passport = require ('passport');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;


const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([ñA-Za-z\-0-9]+\.)+[ña-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    return re.test(String(password));
};

const registerStrategy = new LocalStrategy(
    {
        usernameField:'email',
        passwordField:'password',
        passReqToCallback: true,

    },
    async (req, email, password, done) => {

        try{
            const {user, passwordVerification} = req.body;

            const isSamePassword = password === passwordVerification;

            if (!isSamePassword || !passwordVerification) {
                const error = new Error('Passwords do not match');
                return done(error);
            }

            const isValidEmail = validateEmail(email);
            if (!isValidEmail) {
            const error = new Error('Wrong email, don\'t\ fuck me!');

            return done(error);
            }

            const isValidPassword = validatePassword(password);
            if (!isValidPassword) {
            const error = new Error('Password must have from 6 to 16 characters, an uppercase, lowercase and a number');

            return done(error);
            }


            const existingUser = await User.findOne({email: email});
            if(existingUser) {
                const error = new Error('The user is already registered');
                return done(error);
            }

            const saltRound = 10;
            const hash = await bcrypt.hash(password, saltRound);

            const newUser = new User ({
                email: email,
                password: hash,
                user: user,
            })

            const savedUser = await newUser.save();
            return done(null, savedUser);

        }catch(error) {
            done(error, null)
        }
    }
);

module.exports = registerStrategy;