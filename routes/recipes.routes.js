const router = require ('express').Router()

const {getAllRecipes, getRecipe, postRecipe, deleteRecipe} = require('../controllers/recipes.controller')


router.post('/', postRecipe)
router.get('/', getAllRecipes)
router.get('/:id', getRecipe)

router.delete('/:id', deleteRecipe)

module.exports= router;