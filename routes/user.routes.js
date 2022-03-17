const { response } = require('express');
const express = require ('express');
const passport = require('passport');
const User = require('../models/user.model');

const router = express.Router();

router.post('/register', (req, res, next) => {
    // console.log('req.body', req.body);
    // return res.status(200).json ('Endpoint/ register working')
    try{
        const done = (error, savedUser) => {
            if(error) {
                return next(error);
            }

            req.logIn(savedUser, (error) => {
                if(error) return next (error);

                return res.status(201).json(savedUser);
            });
        }

        passport.authenticate('register', done)(req);

    } catch(error){
        console.log('ERROR!!', error);
    }

});

router.post('/login', (req, res, next) => {
    try{
        const done = (error, existingUser) => {
            if(error) {
                return next(error);
            }
            req.logIn(existingUser, (error) => {
                if(error) return next (error);

                return res.status(200).json(existingUser);
            });
        }

        passport.authenticate('login', done)(req);

    } catch(error){
        return done(error);
    }
})

router.post('/logout', (req, res, next) => {
    if (req.user) {
      // Destruimos el objeto req.user para este usuario
        req.logout();

        req.session.destroy(() => {
            // Eliminamos la cookie de sesión al cancelar la sesión
            res.clearCookie('connect.sid');
            return res.status(200).json('Bye bye!');
        });
    } else {
      return res.sendStatus(304); // Si no hay usuario, no habremos cambiado nada
    }
});

router.get('/', async(req, res, next) => {
    try{
        const users = await User.find({}).populate('recipes')
        res.json(users);

    } catch(error){
        return next(error)
    }
});



module.exports= router;
