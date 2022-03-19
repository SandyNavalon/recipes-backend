
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

// TODO: Refactor this function called by login and register strategy

const validateEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};


const loginStrategy = new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },

    async (req, email, password, done) => {

        try {//validar email
            const isValidEmail = validateEmail(email);
            if (!isValidEmail) {
                const error = new Error("Credenciales incorrectas");
                return done(error);
            }

            //validate email
            const user = await User.findOne({
                email: email
            });

            if (!user) {
                const error = new Error("Credenciales incorrectas");
                return done(error);
            }

            //validate password
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (isValidPassword) {
                user.password = null;
                return done(null, user);
            } else {
                const error = new Error("Credenciales incorrectas");
                return done(error);
            }
        }
        catch (error){
            return done(error);

        }

    }

)

module.exports = loginStrategy;
