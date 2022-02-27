const router = require ('express').Router()

const {getAllRecipes, getRecipe, postRecipe} = require('../controllers/recipes.controller')


router.post('/', postRecipe)
router.get('/', getAllRecipes)
router.get('/:id', getRecipe)

module.exports= router;