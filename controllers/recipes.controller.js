const Recipe = require("../models/recipes.model");

const getAllRecipes = async (req, res, next) => {
    try {
        const allRecipes = await Recipe.find();

        return res.status(200).json(allRecipes);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllRecipes,
};
