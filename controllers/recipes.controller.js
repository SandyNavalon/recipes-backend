const Recipe = require("../models/recipes.model");
const {setError} = require('../config/errors/error');

const getAllRecipes = async (req, res, next) => {
    try {
        const allRecipes = await Recipe.find();
        return res.status(200).json(allRecipes);
    } catch(error) {
        return next(error);
    }
};

const getRecipe = async (req, res, next) => {
    try {
        const {id} = req.params;
        const recipe = await Recipe.findById(id)

        if(!recipe){
            return next(setError (404, 'Recipe does not exist'))
        }
        return res.status(200).json(recipe)

    } catch(error) {
        return next(error);
    }
};

const postRecipe = async (req, res, next) => {
    try{
        const newRecipe = new Recipe(req.body);
        // newRecipe.title = req.body.title
        // newRecipe.type = req.body.type
        // newRecipe.category = req.body.category
        // newRecipe.ingredients = req.body.ingredients
        // newRecipe.description = req.body.description
        // newRecipe.img = req.body.img

        const recipeInDB = await newRecipe.save()
        return res.status(201).json(recipeInDB)

    } catch(err) {
        return next(error);
    }
}

module.exports = {
    getAllRecipes,
    getRecipe,
    postRecipe
};
