const mongoose = require ('mongoose');

const recipeSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        type: {type: String},
        category: {type: String},
        ingredients: ({type: Array}),
        description: { type: String},
        img:{type: String, default: "https://media.discordapp.net/attachments/954654274565054514/955070819447488512/heart-dish_318-49297.png?width=501&height=501"},
        userId: [{type: mongoose.Types.ObjectId, ref: 'User'}],

    },
    {
        timestamps: true
    }
);

const Recipe = mongoose.model('recipes', recipeSchema)
module.exports = Recipe