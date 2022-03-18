<<<<<<< HEAD
const { response } = require('express');
const express = require ('express');
=======
const express = require('express');
>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b
const passport = require('passport');
const User = require('../models/user.model');

const router = express.Router();

router.post('/register', (req, res, next) => {
    // console.log('req.body', req.body);
<<<<<<< HEAD
    // return res.status(200).json ('Endpoint/ register working')
=======
    // return res.status(200).json ('Endpoint/ register working');
>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b
    try{
        const done = (error, savedUser) => {
            if(error) {
                return next(error);
            }
<<<<<<< HEAD

            req.logIn(savedUser, (error) => {
                if(error) return next (error);

                return res.status(201).json(savedUser);
            });
        }
=======
            req.logIn(savedUser, (error) => {
                if (error) return next(error);

                return res.status(201).json(savedUser);

            });

        };
>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b

        passport.authenticate('register', done)(req);

    } catch(error){
        console.log('ERROR!!', error);
    }
<<<<<<< HEAD

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
=======
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
>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b
            });
        }

        passport.authenticate('login', done)(req);
<<<<<<< HEAD

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
=======
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
        const { recipeId} = req.body;
        const { userId } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            recipeId,
            { $push: { users: userId } },
            { new: true }
        );

        console.log('updatedUser->', updatedUser);
        return res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
    }
});

module.exports= router;
>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b
