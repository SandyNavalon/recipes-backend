const User = require('../models/user.model')
const {setError} = require('../config/errors/error')
const JwtUtils = require('../utils/jwt/jwtUtils')
const bcrypt = require('bcrypt')


//añadir un nuevo usuario
const postNewUser = async (req, res, next) => {
    try {

        const newUser = new User(req.body)
        const userExist = await User.findOne({ user: newUser.user })
        const emailExist = await User.findOne({ email: newUser.email })

        if (userExist) {
            return next(setError(404, 'This user already exists'))
        }

        if (emailExist){
            return next(setError(404, 'This email already exists'))
        }
        const userInBd = await newUser.save()



        userInBd.password = null
        return res.status(201).json(userInBd)
    } catch (error) {
        return next(error)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch(error) {
        return next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        //console.log('alias-->',req.body.alias)
        const userInBd = await User.findOne({ alias: req.body.alias })
         //console.log('usuario encontrado-->',userInBd)

        if (!userInBd) {
            return next(setError(404, 'user not found'))
        }

        if (bcrypt.compareSync(req.body.password, userInBd.password)) {
            userInBd.password = null
             console.log('constraseña correcta')

            const token = JwtUtils.generate(userInBd._id, userInBd.alias)
            //const token = jwt.sign({ id: userInBd._id, alias: userInBd.alias }, process.env.JWT_SECRET, { expiresIn: '1d' });

            return res.status(200).json(token)
        }

    } catch (error) {
        error.message = 'error to login'
        return next(error)
    }

}

module.exports = {
    postNewUser,
    loginUser,
    getAllUsers
}
