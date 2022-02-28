const mongoose = require ('mongoose');

const recipeSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, trim: true},
        type: {type: String, trim: true},
        category: {type: String, trim: true},
        ingredients: {type: Array, trim: true},
        description: { type: String, trim: true},
        img:{type: String, trim: true},
        owner:{ type: mongoose.Types.ObjectId, ref:'users' },
    },
    {
        timestamps: true
    }
);

const Recipe = mongoose.model('recipes', recipeSchema)
module.exports = Recipe