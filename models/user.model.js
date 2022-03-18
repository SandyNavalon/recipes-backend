<<<<<<< HEAD
const mongoose = require("mongoose");
=======
const mongoose = require('mongoose');
>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b

const Schema = mongoose.Schema;

const userSchema = new Schema(
<<<<<<< HEAD
    {
        email: { type: String, required: true },
        user: { type: String},
        password: { type: String, required: true },
        passwordVerification: { type: String },

        recipes: [{type: mongoose.Types.ObjectId, ref: 'recipes'}],

        // recipes: [
        //     {
        //         title: {type: String, required: true},
        //         type: {type: String},
        //         category: {type: String},
        //         ingredients: {type: Array},
        //         description: { type: String},
        //         img:{type: String, default: 'https://images-ext-2.discordapp.net/external/tlYN6bWvVK0VKxwLrBAFgFkOvf8dWGRlrttCm6APuqY/https/image.freepik.com/free-icon/heart-dish_318-49297.jpg'},
        //     },
        // ]
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
=======
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordVerification: {type: String},
    user: { type: String },
    recipes: [{ type: mongoose.Types.ObjectId, ref: 'recipes' }],
    //lastName: { type: String, required: true }, 
    //phoneNumber:{ type: String, required: true },
    //....
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
>>>>>>> f4903c9f830e2485f8e975df36e522516bc5d10b
