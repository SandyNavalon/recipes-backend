const mongoose = require ('mongoose');
const bcrypt = require('bcrypt')
const {validationPassword} = require('../utils/validators/validators')
const {setError} = require('../config/errors/error.js')

const userSchema = new mongoose.Schema(
    {
        user: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        img:{type: String}

    },
    {
        timestamps: true
    }
);

//valoidacion de password
userSchema.pre("save", function (next) {
    if(!validationPassword(this.password)){
        return next(setError(400, 'Wrong Password'))
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


const User = mongoose.model('users', userSchema)
module.exports = User