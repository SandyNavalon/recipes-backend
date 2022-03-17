const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
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
