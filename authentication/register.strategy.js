const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const bcrypt = require("bcrypt");

//validaciones
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([ñA-Za-z\-0-9]+\.)+[ña-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    //de 6 a 10 caracteres, mayus y minus, al menos un numero y al menos un character especial
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    return re.test(String(password));
};




// Estrategia de registro
const registerStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },

    async (req, email, password, done) => {

        const existingUser = await User.findOne({
            email: email
        });
        try {
            const isValidEmail = validateEmail(email);
            if (!isValidEmail) {
                const error = new Error('Email inválido, no me hagas trampas!');
                return done(error);
            }


            if (existingUser) {
                const error = new Error('este usuario me suena');
                return done(error);
            }

            const saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                email: email,
                password: hash,
                user: req.body.user,
            })

            const savedUser = await newUser.save();
            return done(null, savedUser);
        } catch (error) {
            done(error, null)
        }

    }
)

module.exports = registerStrategy