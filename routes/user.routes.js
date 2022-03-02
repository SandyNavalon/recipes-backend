const express = require ('express');
const passport = require('passport');
const User = require('../models/user.model');

const router = express.Router();

router.post('/register', (req, res, next) => {
    // console.log('req.body', req.body);
    // return res.status(200).json ('Endpoint/ register working');
    try{
        const done = (error, savedUser) => {
            if(error) {
                return next(error);
            }
            return res.status(201).json(savedUser);
        }

        passport.authenticate('register', done)(req);

    } catch(error){
        console.log('ERROR!!', error);
    }
});

module.exports= router;
