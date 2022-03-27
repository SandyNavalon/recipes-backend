const router = require ('express').Router();
const { upload, uploadToCloudinary } = require('../middleware/file.middleware');

const {getAllRecipes, getRecipe, postRecipe, deleteRecipe, putRecipe, getRecipeByUser} = require('../controllers/recipes.controller')


router.post('/create',[upload.single('img'), uploadToCloudinary],  postRecipe)
router.get('/', getAllRecipes)
router.get('/myRecipes/:id', getRecipeByUser )
router.get('/:id', getRecipe)


//el put busca y modifica
router.put('/:id', putRecipe)
router.delete('/:id', deleteRecipe)


module.exports= router;