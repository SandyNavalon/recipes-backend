const router = require ('express').Router();
const { upload, uploadToCloudinary } = require('../middleware/file.middleware');

const {getAllRecipes, getRecipe, getRecipeByUser, postRecipe, deleteRecipe, putRecipe} = require('../controllers/recipes.controller')


router.post('/create',[upload.single('img'), uploadToCloudinary],  postRecipe)
router.get('/', getAllRecipes)
router.get('/:id', getRecipe)
router.get('/myRecipes/:id', getRecipeByUser )

//el patch busca y modifica
router.put('/edit/:id', putRecipe)
router.delete('/:id', deleteRecipe)


module.exports= router;