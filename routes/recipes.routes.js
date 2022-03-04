const router = require ('express').Router();
const { upload, uploadToCloudinary } = require('../middlewares/file.middleware');

const {getAllRecipes, getRecipe, postRecipe, deleteRecipe, patchRecipe} = require('../controllers/recipes.controller')


router.post('/create',[upload.single('img'), uploadToCloudinary], postRecipe)

router.get('/', getAllRecipes)
router.get('/:id', getRecipe)

router.delete('/:id', deleteRecipe)

router.patch('/:id', patchRecipe)

module.exports= router;