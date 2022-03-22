
const {setError} = require('../config/errors/error');

const Recipe = require("../models/recipes.model");
const User = require("../models/user.model");
const Comment = require("../models/comments.model")

const getAllRecipes = async (req, res, next) => {
    try {
        console.log('req.user', req.user);

        const allRecipes = await Recipe.find();
        return res.status(200).json(allRecipes);
    } catch(error) {
        return next(error);
    }
};

const getRecipe = async (req, res, next) => {
    try {
        console.log('req.user', req.user);

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
        const { title, type, category, ingredients, description, userId, comments } = req.body;
        console.log(req.user);

        const user = await User.findById(userId)
        const comment = await Comment.findById(comments)

        const recipeImg = req.recipeImgFromCloudinary ? req.recipeImgFromCloudinary : null;

        console.log('imgfromcloudinary', req.recipeImgFromCloudinary);
        const newRecipe = new Recipe({
            title,
            type,
            category,
            ingredients,
            description,
            userId: user._id,
            comments: []
        })
        newRecipe.img = recipeImg;

        const recipeInDB = await newRecipe.save()

        user.recipes = user.recipes.concat(recipeInDB._id)
        await user.save()

        //comment.recipes = comment.recipes.concat(recipeInDB._id)
        //await comment.save()

        return res.status(201).json(recipeInDB)

    } catch(error) {
        return next(error);
    }
};

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
