const mongoose = require ('mongoose');

const recipeSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        type: {type: String},
        category: {type: String},
        ingredients: {type: Array},
        description: { type: String},
        img:{type: String}

    },
    {
        timestamps: true
    }
);

const Recipe = mongoose.model('recipes', recipeSchema)
module.exports = Recipe