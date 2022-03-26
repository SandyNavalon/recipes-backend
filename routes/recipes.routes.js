const router = require ('express').Router();
const { upload, uploadToCloudinary } = require('../middleware/file.middleware');

const {getAllRecipes, getRecipe, postRecipe, deleteRecipe, patchRecipe, getRecipeByUser} = require('../controllers/recipes.controller')


router.post('/create',[upload.single('img'), uploadToCloudinary],  postRecipe)
router.get('/', getAllRecipes)
router.get('/myRecipes/:id', getRecipeByUser )
router.get('/:id', getRecipe)


//el patch busca y modifica
router.patch('/:id', patchRecipe)
router.delete('/:id', deleteRecipe)


module.exports= router;