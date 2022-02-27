const router = require ('express').Router()

const {getAllRecipes} = require('../controllers/recipes.controller')


router.get('/', getAllRecipes)

module.exports= router;