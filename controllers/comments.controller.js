
//Importamos error para controlar los errores
const {setError} = require('../config/errors/error');
//Importamos los modelos user, recipe y comment
const Comment = require("../models/comments.model");
const User = require("../models/user.model");
const Recipe = require("../models/recipes.model");

//Obtenemos todos los comentarios sobre las recetas
const getAllComments = async (req, res, next) => {
    try {
        console.log('req.comment', req.comment);
        const allComments = await Comment.find();
        return res.status(200).json(allComments);
    } catch(error) {
        return next(error);
    }
};

const getComment = async (req, res, next) => {
    try {
        const {id} = req.params;
        const comment = await Comment.findById(id);

        if(!comment){
            return next(setError (404, 'Comment does not exist'))
        }
        return res.status(200).json(comment)

    } catch(error) {
        return next(error);
    }
};

const postComment = async (req, res, next) => {
    try{
        const { content, recipeId, userId} = req.body;
        console.log(req.body);

        const recipe = await Recipe.findById(recipeId)
        const user = await User.findById(userId)
        //console.log(recipe);
        console.log(req.user);

        const newComment = new Comment({
            content,
            recipeId: recipeId,
            userId: userId
        })

        const commentInDB = await newComment.save()

        recipe.comments = recipe.comments.concat(commentInDB._id)
        await recipe.save()

        user.comments = user.comments.concat(commentInDB._id)
        await user.save()

        return res.status(201).json(commentInDB)

    } catch(error) {
        return next(error);
    }
};

const deleteComment = async(req, res, next) => {
    try{
        const {id} = req.params
        const commentDeleted = await Comment.findByIdAndDelete(id)

        if(!commentDeleted) return next(setError(404, 'Comment does not exist'))
        return res.status(200).json(commentDeleted)

    } catch(err){
        return next (error)
    }
}

const updateComment = async (req, res, next) => {
    try{
        const {id} = req.params
        const updateComment = new Comment(req.body)
        updateComment._id = id

        const modifiedComment = await Comment.findByIdAndUpdate(id, updateComment)
        if(!modifiedComment) return next(setError(404, 'Comentario no existe'))
        return res.status(200).json(modifiedComment)

    }catch(error){
        return next(error)
    }
}

module.exports = {
    getAllComments,
    getComment,
    postComment,
    deleteComment,
    updateComment
};