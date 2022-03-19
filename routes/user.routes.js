
const express = require('express');
const passport = require('passport');
const User = require('../models/user.model');

const router = express.Router();

router.post('/register', (req, res, next) => {
    // console.log('req.body', req.body);
    // return res.status(200).json ('Endpoint/ register working');
    try{
        console.log('prueba register', req.body);
        const done = (error, savedUser) => {
            if(error) {
                return next(error);
            }
            req.logIn(savedUser, (error) => {
                if (error) return next(error);

                return res.status(201).json(savedUser);

            });

        };

        passport.authenticate('register', done)(req);

    } catch(error){
        console.log('ERROR!!', error);
    }
});

router.post('/login', (req, res, next) => {
    try {
        const done = (error, user) => {
            if(error) {
                return next(error);
            }

            req.logIn(user, (error) => {
                if (error) return next(error);

                return res.status(200).json(user);
            });
        }

        passport.authenticate('login', done)(req);
    } catch (error) {
        return next(error);
    }
});


router.post('/logout', (req, res, next) => {
    if (req.user) {
        // deslogueo al usuario

        req.logout();

        req.session.destroy(() => {
            //elimina cookie
            res.clearCookie('connect.sid');

            return res.status(200).json('Usuario deslogueado');
        });
    } else {
        const error = new Error('No existe usuario logueado');
        return next(error);
    }
});

router.get('/', async (req, res, next) => {
    try{
        const users = await User.find({}).populate('recipes')
        res.json(users);

    }catch(error){
    return next(error)
    }
}
)

router.put('/add', async (req, res, next) => {
    try {
        const { recipeId } = req.body;
        const { userId } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { recipes: recipeId } },
            { new: true }
        );

        console.log('updatedUser->', updatedUser);
        return res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
    }
});

module.exports= router;
