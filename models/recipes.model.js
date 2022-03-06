const mongoose = require ('mongoose');

const recipeSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        type: {type: String},
        category: {type: String},
        ingredients: {type: Array},
        description: { type: String},
        img:{type: String, default: 'https://images-ext-2.discordapp.net/external/tlYN6bWvVK0VKxwLrBAFgFkOvf8dWGRlrttCm6APuqY/https/image.freepik.com/free-icon/heart-dish_318-49297.jpg'},
        userId: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    },
    {
        timestamps: true
    }
);

const Recipe = mongoose.model('recipes', recipeSchema)
module.exports = Recipe