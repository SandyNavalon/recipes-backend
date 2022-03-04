const Recipe = require("../models/recipes.model");
const {setError} = require('../config/errors/error');

const getAllRecipes = async (req, res, next) => {
    try {
        //con este req.user te rescata en terminal el usuario que esté logueado
        //en ese momento
        console.log('req.user', req.user);
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
console.log('req.photoFromCloudinary', req.photoFromCloudinary);

        const recipeImg = req.photoFromCloudinary ? req.photoFromCloudinary : null;

        const newRecipe = new Recipe();
        newRecipe.title = req.body.title
        newRecipe.type = req.body.type
        newRecipe.category = req.body.category
        newRecipe.ingredients = req.body.ingredients
        newRecipe.description = req.body.description
        newRecipe.img = recipeImg

        const recipeInDB = await newRecipe.save()
        return res.status(201).json(recipeInDB)

    } catch(err) {
        return next(error);
    }
}

const deleteRecipe = async(req, res, next) => {
    try{
        const {id} = req.params
        const recipeDeleted = await Recipe.findByIdAndDelete(id)

        if(!recipeDeleted) return next(setError(404, 'Recipe does not exist'))
        return res.status(200).json(recipeDeleted)

    } catch(err){
        return next (error)
    }
}


const patchRecipe = async (req, res, next) => {
    try{

            const {id}=req.params
            const patchRecipe = new Recipe(req.body)
            patchRecipe._id = id

            const updateRecipe = await Recipe.findByIdAndUpdate(id, patchRecipe)
            if(!updateRecipe) return next(setError(404, 'Receta no existe'))
            return res.status(200).json(updateRecipe)
    }catch(error){
       return next(error) 
    }
}

module.exports = {
    getAllRecipes,
    getRecipe,
    postRecipe,
    deleteRecipe,
    patchRecipe
};
