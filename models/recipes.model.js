const mongoose = require ('mongoose');

const recipeSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},

    },
    {
        timestamps: true
    }
);

const Recipe = mongoose.model('recipes', recipeSchema)
module.exports = Recipe
